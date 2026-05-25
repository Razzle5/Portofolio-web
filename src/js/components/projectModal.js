/**
 * components/projectModal.js — Project detail modal
 * Full-screen overlay with backdrop blur, animated scale+fade entrance,
 * and dismissal via backdrop click, close button, or Escape key.
 */

import { projects } from '../data.js';

let onKeyDown = null; // reference for cleanup

/* ── Open ──────────────────────────────────────────────────────────────────── */

/**
 * Open the project detail modal for a given project ID.
 * @param {number} projectId
 */
export function openProjectModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  // Remove any existing modal
  closeProjectModal();

  const modal = document.createElement('div');
  modal.id = 'project-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <!-- Close button -->
      <button class="modal__close" id="modal-close-btn" aria-label="Close modal">
        <i data-lucide="x"></i>
      </button>

      <!-- Screenshot placeholder -->
      <div class="modal__image">
        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy"
             onerror="this.style.display='none';" />
      </div>

      <!-- Content -->
      <div class="modal__content">
        <span class="modal__badge">${project.category}</span>
        <h2 class="modal__title">${project.title}</h2>
        <p class="modal__description">${project.longDescription}</p>

        <div class="modal__tags">
          ${project.techStack.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>

        <div class="modal__actions">
          <a href="${project.demoUrl}" target="_blank" rel="noopener" class="btn btn--primary">
            <i data-lucide="globe"></i> Live Demo
          </a>
          <a href="${project.sourceUrl}" target="_blank" rel="noopener" class="btn btn--outline">
            <i data-lucide="github"></i> Source Code
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.add('no-scroll');

  // Initialise Lucide icons inside modal
  if (window.lucide) lucide.createIcons({ nodes: [modal] });

  // Animate in
  requestAnimationFrame(() => modal.classList.add('modal-overlay--visible'));

  // ── Close handlers ────────────────────────────────────────────────────
  modal.querySelector('#modal-close-btn').addEventListener('click', closeProjectModal);

  // Backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  // Escape key
  onKeyDown = (e) => {
    if (e.key === 'Escape') closeProjectModal();
  };
  document.addEventListener('keydown', onKeyDown);
}

/* ── Close ─────────────────────────────────────────────────────────────────── */

export function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('modal-overlay--visible');
  modal.classList.add('modal-overlay--exit');

  modal.addEventListener('transitionend', () => {
    modal.remove();
    document.body.classList.remove('no-scroll');
  }, { once: true });

  // Fallback removal
  setTimeout(() => {
    modal.remove();
    document.body.classList.remove('no-scroll');
  }, 500);

  // Cleanup keyboard listener
  if (onKeyDown) {
    document.removeEventListener('keydown', onKeyDown);
    onKeyDown = null;
  }
}
