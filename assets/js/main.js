/**
 * main.js — site behaviour (ES module, no globals)
 *
 *  - fixed header scroll state, back-to-top button, mobile menu
 *  - appointment dialog (native <dialog>)
 *  - reveal-on-scroll + count-up numbers
 *  - filter pills (services, gallery)
 *  - gallery lightbox (keyboard + swipe)
 *
 * Bootstrap 6 supplies the CSS foundation (reboot, grid, utilities, .dialog);
 * its JS bundle is not needed here. If you add Bootstrap JS components later,
 * import them as ES modules, e.g.
 *   import { Tooltip } from 'https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js';
 */

import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { initAppointments, prefillDoctor, resetAppointment } from './appointment.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Dialog helpers (with exit animation) ─────────────────────────── */
function openDialog(dialog) {
  if (!dialog || dialog.open) return;
  dialog.classList.remove('hiding');
  dialog.showModal();
  document.documentElement.classList.add('dialog-open');
}

function closeDialog(dialog) {
  if (!dialog || !dialog.open) return;
  const finish = () => {
    dialog.classList.remove('hiding');
    dialog.close();
  };
  if (reduceMotion || !dialog.classList.contains('dialog')) return finish();
  dialog.classList.add('hiding');
  setTimeout(finish, 300);
}

function wireDialog(dialog) {
  if (!dialog) return;
  // Close buttons
  dialog.querySelectorAll('[data-close]').forEach((btn) => btn.addEventListener('click', () => closeDialog(dialog)));
  // Click on the backdrop (outside the dialog box) closes it
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDialog(dialog); });
  // Esc: animate instead of closing instantly
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeDialog(dialog); });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('dialog-open');
  });
}

/* ── Navbar ───────────────────────────────────────────────────────── */
function initNav() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero'); // homepage only
  const fabs = document.querySelector('.fab-stack');
  const toTop = document.querySelector('[data-to-top]');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    toTop?.classList.toggle('is-visible', y > 600);
    // The homepage hero has its own call/WhatsApp buttons, so hide the floating ones there
    if (hero) fabs?.classList.toggle('is-hidden', y < hero.offsetHeight * 0.6);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  });

  const menu = document.getElementById('mobileMenu');
  const toggles = document.querySelectorAll('[data-menu-open]');
  if (!menu || !toggles.length) return;
  wireDialog(menu);
  toggles.forEach((toggle) => toggle.addEventListener('click', () => {
    openDialog(menu);
    toggle.setAttribute('aria-expanded', 'true');
  }));
  menu.addEventListener('close', () => toggles.forEach((t) => t.setAttribute('aria-expanded', 'false')));
  // Navigating (or opening the booking form) from the menu closes it
  menu.querySelectorAll('a, [data-book]').forEach((el) => el.addEventListener('click', () => menu.close()));
  // Close the menu if the viewport grows and no menu button is visible any more
  window.matchMedia('(width >= 1280px)').addEventListener('change', (e) => {
    if (e.matches && [...toggles].every((t) => t.offsetParent === null)) menu.close();
  });
}

/* ── Drag to scroll (mouse) for horizontal scrollers ──────────────────
   Touch devices already swipe natively; this adds click-and-drag for mouse
   users. A drag never triggers the click on a link/button inside a card. */
function initDragScroll() {
  document.querySelectorAll('[data-drag]').forEach((el) => {
    const update = () => el.classList.toggle('can-drag', el.scrollWidth > el.clientWidth + 2);
    update();
    window.addEventListener('resize', update);

    let startX = 0, startLeft = 0, moved = false, active = false;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || !el.classList.contains('can-drag')) return;
      active = true; moved = false;
      startX = e.clientX; startLeft = el.scrollLeft;
    });
    el.addEventListener('pointermove', (e) => {
      if (!active) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.classList.add('is-dragging');
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = startLeft - dx;
    });
    const end = () => {
      if (!active) return;
      active = false;
      if (!moved) return;
      el.classList.remove('is-dragging'); // scroll-snap snaps to the nearest card again
      // Swallow the click that follows a drag
      el.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
      setTimeout(() => { moved = false; }, 0);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

/* ── Carousels: prev/next buttons for horizontal scrollers ────────── */
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((nav) => {
    const track = document.getElementById(nav.dataset.carousel);
    if (!track) return;
    const prev = nav.querySelector('[data-prev]');
    const next = nav.querySelector('[data-next]');
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + 14;
    const update = () => {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}

/* ── Appointment dialog ───────────────────────────────────────────── */
function initBooking() {
  const dialog = document.getElementById('apptDialog');
  if (!dialog) return;
  wireDialog(dialog);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-book]');
    if (!trigger) return;
    e.preventDefault();
    const wrap = dialog.querySelector('[data-appt]');
    resetAppointment(wrap);
    prefillDoctor(wrap, trigger.dataset.doctor || '');
    openDialog(dialog);
    // Focus the first field for keyboard & screen-reader users
    setTimeout(() => dialog.querySelector('input[name="name"]')?.focus(), 50);
  });
}

/* ── Reveal on scroll ─────────────────────────────────────────────── */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
}

/* ── Count-up numbers (ease-out cubic) ────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const render = (el, value) => { el.textContent = `${value}${el.dataset.suffix || ''}`; };

  if (!('IntersectionObserver' in window) || reduceMotion) {
    counters.forEach((el) => render(el, el.dataset.count));
    return;
  }
  const easeOutCubic = (x) => 1 - (1 - x) ** 3;
  const run = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      render(el, Math.round(target * easeOutCubic(p)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => { render(el, 0); io.observe(el); });
}

/* ── Marquees: pause when off-screen (saves battery) ──────────────── */
function initMarquees() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-paused', !entry.isIntersecting));
  });
  document.querySelectorAll('.marquee').forEach((m) => io.observe(m));
}

/* ── Filter pills (services + gallery) ────────────────────────────── */
function initFilters() {
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const target = document.getElementById(group.dataset.filterGroup);
    if (!target) return;
    const buttons = group.querySelectorAll('[data-filter]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        target.querySelectorAll('[data-filter-item]').forEach((item) => {
          const show = cat === 'all' || item.dataset.cat.split(' ').includes(cat);
          item.classList.toggle('is-hidden', !show);
          item.classList.remove('is-shown');
          if (show) {
            void item.offsetWidth; // restart the pop-in animation
            item.classList.add('is-shown');
          }
        });
        target.dispatchEvent(new CustomEvent('filtered'));
      });
    });
  });
}

/* ── Lightbox ─────────────────────────────────────────────────────────
   Any element with [data-lb-group] is a photo set; its [data-lb-item]
   children open the shared <dialog id="lightbox"> (gallery page grid,
   About page "See our new building" teaser). Items hidden by a filter
   (.is-hidden) are skipped. */
function initLightbox() {
  const box = document.getElementById('lightbox');
  const groups = document.querySelectorAll('[data-lb-group]');
  if (!box || !groups.length) return;
  wireDialog(box);

  const img = box.querySelector('.lb-stage img');
  const caption = box.querySelector('.lb-caption');
  const count = box.querySelector('.lb-count');
  let list = [];
  let index = 0;



  const show = (i) => {
    index = (i + list.length) % list.length;
    const item = list[index];
    const thumb = item.querySelector('img');
    img.src = item.dataset.full || thumb.src;
    img.alt = thumb.alt;
    caption.textContent = item.querySelector('.cap')?.textContent || '';
    count.textContent = `${index + 1} / ${list.length}`;
  };

  groups.forEach((group) => {
    group.addEventListener('click', (e) => {
      const item = e.target.closest('[data-lb-item]');
      if (!item) return;
      e.preventDefault();
      list = [...group.querySelectorAll('[data-lb-item]:not(.is-hidden)')];
      show(list.indexOf(item));
      openDialog(box);
    });
  });

  box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe (touch + pen)
  const stage = box.querySelector('.lb-stage');
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  // Caption follows language changes while open
  document.addEventListener('langchange', () => { if (box.open) show(index); });
}

/* ── Misc ─────────────────────────────────────────────────────────── */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/* ── Boot ─────────────────────────────────────────────────────────── */
document.documentElement.classList.add('ready');
initI18n();
initTheme();
initNav();
initAppointments();
initBooking();
initReveal();
initCounters();
initMarquees();
initFilters();
initLightbox();
initCarousels();
initDragScroll();
initYear();
