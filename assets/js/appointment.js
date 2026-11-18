/**
 * appointment.js — appointment form (sitewide dialog + contact page)
 *
 * Validates inline, then opens the selected doctor's WhatsApp with a
 * pre-filled message in the active language, one line per field:
 *   Form label - Input
 * Works for every <form data-appt-form> on the page.
 */

import { t, getLang } from './i18n.js';

/* ── Settings: edit these ─────────────────────────────────────────── */
export const APPT_CONFIG = {
  // WhatsApp numbers with country code, digits only.
  // Each booking goes to the doctor chosen in the form; "Any doctor" uses the hospital number.
  // [confirm] which number belongs to which doctor.
  whatsapp: {
    hospital: '918605332363', // main hospital number (also used by the floating WhatsApp button)
    manoj: '918605332363',    // Dr. Manoj Rayate — Gynaecology
    priya: '917588569555',    // Dr. Priya Rayate — Ayurveda & Family Medicine
  },
  // Days when OPD is closed (0 = Sunday … 6 = Saturday). [confirm] — use [] to allow every day.
  closedDays: [0],
};

const MOBILE_RE = /^[6-9]\d{9}$/;

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Build a wa.me link for a doctor (or the hospital). Without text it opens a plain chat. */
export function waLink(text = '', doctor = '') {
  const number = APPT_CONFIG.whatsapp[doctor] || APPT_CONFIG.whatsapp.hospital;
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

function setError(form, name, key) {
  const field = form.querySelector(`[data-field="${name}"]`);
  if (!field) return;
  const msg = field.querySelector('.field-error');
  const input = field.querySelector('input, select, textarea');
  if (key) {
    field.classList.add('has-error');
    msg.dataset.i18n = key; // re-translated automatically on language change
    msg.textContent = t(key);
    input?.setAttribute('aria-invalid', 'true');
  } else {
    field.classList.remove('has-error');
    delete msg.dataset.i18n;
    msg.textContent = '';
    input?.removeAttribute('aria-invalid');
  }
}

function validateField(form, name) {
  const el = form.elements[name];
  if (!el) return true;
  const value = (el.value || '').trim();
  let error = null;

  if (name === 'name' && value.length < 2) error = 'err.name';

  if (name === 'mobile') {
    // Accept spaces, dashes and a leading +91 / 0, then check the 10 digits
    const digits = value.replace(/[\s-]/g, '').replace(/^(\+?91|0)(?=\d{10}$)/, '');
    if (!MOBILE_RE.test(digits)) error = 'err.mobile';
  }

  if (name === 'date') {
    if (!value) error = 'err.date';
    else if (value < todayISO()) error = 'err.past';
    else {
      const day = new Date(`${value}T12:00:00`).getDay();
      if (APPT_CONFIG.closedDays.includes(day)) error = 'err.closed';
    }
  }

  setError(form, name, error);
  return !error;
}

/** Text shown to the visitor for the selected <option> / radio (already translated). */
function chosenLabel(form, name) {
  const el = form.elements[name];
  if (!el) return '';
  if (el instanceof RadioNodeList) {
    const checked = [...el].find((r) => r.checked);
    return checked ? checked.closest('label').textContent.trim() : '';
  }
  if (el.tagName === 'SELECT') return el.options[el.selectedIndex]?.textContent.trim() || '';
  return el.value.trim();
}

function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString(getLang() === 'mr' ? 'mr-IN' : 'en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

/**
 * WhatsApp message: a greeting, then one line per form field written as
 *   Form label - Input
 * using the labels exactly as shown on the form (in the active language).
 */
function buildMessage(form) {
  const rows = [
    ['f.name', form.elements.name.value.trim()],
    ['f.mobile', form.elements.mobile.value.trim()],
    ['f.doctor', chosenLabel(form, 'doctor')],
    ['f.visit', chosenLabel(form, 'visit')],
    ['f.date', formatDate(form.elements.date.value)],
    ['f.slot', chosenLabel(form, 'slot')],
    ['f.msg', form.elements.message.value.trim()],
  ].filter(([, value]) => value); // skip the optional message when empty

  return [t('wa.greet'), '', ...rows.map(([key, value]) => `${t(key)} - ${value}`)].join('\n');
}

function showSuccess(form, url) {
  const wrap = form.closest('[data-appt]');
  const success = wrap.querySelector('[data-appt-success]');
  success.querySelector('[data-wa-again]').href = url;
  form.hidden = true;
  success.hidden = false;
  success.querySelector('h3')?.focus();
}

export function resetAppointment(wrap) {
  const form = wrap.querySelector('[data-appt-form]');
  const success = wrap.querySelector('[data-appt-success]');
  form.reset();
  ['name', 'mobile', 'date'].forEach((n) => setError(form, n, null));
  form.hidden = false;
  success.hidden = true;
}

/** Pre-select a doctor ('manoj' | 'priya' | '') in a form. */
export function prefillDoctor(wrap, doctor) {
  const select = wrap.querySelector('select[name="doctor"]');
  if (!select) return;
  select.value = doctor || '';
  // Sensible default visit type for each doctor
  const visit = wrap.querySelector('select[name="visit"]');
  if (visit && doctor) visit.value = doctor === 'priya' ? 'ayurveda' : 'pregnancy';
}

export function initAppointments() {
  // Doctor pre-selection from URL, e.g. contact.html?doctor=priya#appointment
  const urlDoctor = new URLSearchParams(location.search).get('doctor');

  document.querySelectorAll('[data-appt]').forEach((wrap) => {
    const form = wrap.querySelector('[data-appt-form]');
    if (!form) return;

    form.elements.date.min = todayISO();
    if (urlDoctor && wrap.dataset.appt === 'page') prefillDoctor(wrap, urlDoctor);

    // Validate on blur, and live once a field has shown an error
    ['name', 'mobile', 'date'].forEach((name) => {
      const el = form.elements[name];
      el.addEventListener('blur', () => { if (el.value) validateField(form, name); });
      el.addEventListener('input', () => {
        if (el.closest('.has-error')) validateField(form, name);
      });
    });
    form.elements.date.addEventListener('change', () => validateField(form, 'date'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = ['name', 'mobile', 'date'].map((n) => validateField(form, n));
      if (results.includes(false)) {
        form.querySelector('.has-error input, .has-error select')?.focus();
        return;
      }

      // Send to the chosen doctor's WhatsApp ("Any doctor" → hospital number)
      const url = waLink(buildMessage(form), form.elements.doctor.value);

      // TODO: backend hook — when a PHP/email endpoint is ready, also POST the data, e.g.
      // fetch('/api/appointment.php', { method: 'POST', body: new FormData(form) });

      window.open(url, '_blank', 'noopener');
      showSuccess(form, url);
    });

    wrap.querySelector('[data-appt-new]')?.addEventListener('click', () => {
      resetAppointment(wrap);
      form.elements.name.focus();
    });
  });

  // Plain WhatsApp links (floating button, contact card) get a greeting in the active language
  const updateWa = () => {
    document.querySelectorAll('[data-wa-link]').forEach((a) => { a.href = waLink(t('wa.general')); });
  };
  updateWa();
  document.addEventListener('langchange', updateWa);
}
