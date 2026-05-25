/**
 * app.js — Main application entry point
 * Initialises the hash-based router, maps routes to page renderers,
 * and manages authentication guards for admin routes.
 */

import { Router } from './router.js';
import { requireAuth } from './auth.js';
import { cleanupScrollAnimations } from './utils/animations.js';

// ── Page imports ──────────────────────────────────────────────────────────────
import { renderHome, initHome }                     from './pages/home.js';
import { renderAdminLogin, initAdminLogin }         from './pages/adminLogin.js';
import { renderDashboard, initDashboard }           from './pages/dashboard.js';
import { renderAdminProjects, initAdminProjects }   from './pages/adminProjects.js';
import { renderAdminMessages, initAdminMessages }   from './pages/adminMessages.js';

// ── Project modal (opened from the /project/:id route) ───────────────────────
import { openProjectModal } from './components/projectModal.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Render HTML into #app and run post-render setup. */
function mountPage(html, initFn) {
  // Cleanup previous observers
  cleanupScrollAnimations();

  const app = document.getElementById('app');
  app.innerHTML = html;

  // Initialise Lucide icons on newly rendered content
  if (window.lucide) {
    lucide.createIcons();
  }

  // Run the page-specific init (event listeners, animations, etc.)
  if (typeof initFn === 'function') {
    initFn();
  }

  // Scroll to top on page change
  window.scrollTo(0, 0);
}

/** Guard wrapper — redirects to login if unauthenticated. */
function guardedMount(html, initFn) {
  if (!requireAuth()) return;
  mountPage(html, initFn);
}

// ── Route map ─────────────────────────────────────────────────────────────────

const router = new Router({
  '/': () => {
    mountPage(renderHome(), initHome);
  },

  '/project/:id': (params) => {
    // Render the home page first, then open the project modal
    mountPage(renderHome(), () => {
      initHome();
      // Small delay so the DOM is ready for the modal
      setTimeout(() => openProjectModal(Number(params.id)), 100);
    });
  },

  '/admin-login': () => {
    mountPage(renderAdminLogin(), initAdminLogin);
  },

  '/admin': () => {
    guardedMount(renderDashboard(), initDashboard);
  },

  '/admin/projects': () => {
    guardedMount(renderAdminProjects(), initAdminProjects);
  },

  '/admin/messages': () => {
    guardedMount(renderAdminMessages(), initAdminMessages);
  },
});

// ── Bootstrap ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Start the router
  router.init();
});
