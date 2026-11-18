/**
 * theme.js — light / dark mode
 *
 * Light is the default. The sun/moon button switches theme and saves the
 * choice in localStorage. The inline script in each page's <head> applies the
 * saved theme before first paint, so there is no flash.
 */

const KEY = 'rayate-theme';
const root = document.documentElement;

export function currentTheme() {
  return root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
}

function apply(theme) {
  root.setAttribute('data-bs-theme', theme);
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  });
  // Keep the mobile browser UI colour in sync
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0F0B16' : '#FFFFFF');
}

export function initTheme() {
  apply(currentTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
    });
  });
}
