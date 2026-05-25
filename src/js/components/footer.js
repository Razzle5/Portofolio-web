/**
 * components/footer.js — Site footer
 * Logo, navigation links, social icons, copyright, and back-to-top button.
 */

import { socialLinks } from '../data.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderFooter() {
  return `
  <footer id="footer" class="footer" style="padding: var(--space-xl) 0; border-top: 1px solid var(--border-primary);">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
      
      <!-- Copyright -->
      <div class="footer__copy" style="color: var(--text-muted); font-size: var(--text-sm);">
        &copy; 2024 Farros. Built with Precision.
      </div>

      <!-- Socials -->
      <div class="footer__socials" style="display: flex; gap: var(--space-md);">
        ${socialLinks
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" style="color: var(--text-muted); transition: color var(--transition-fast); width: 20px; height: 20px; display: block;">
                ${s.icon}
              </a>`,
          )
          .join('')}
      </div>

    </div>
  </footer>`;
}

/* ── Init (back-to-top) ───────────────────────────────────────────────────── */

export function initFooter() {
  const btn = document.getElementById('back-to-top');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
