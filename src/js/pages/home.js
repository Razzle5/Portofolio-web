/**
 * pages/home.js — Public landing page
 * Assembles all public-facing components and initialises them.
 */

import { renderNavbar, initNavbar }       from '../components/navbar.js';
import { renderHero, initHero }           from '../components/hero.js';
import { renderAbout, initAbout }         from '../components/about.js';
import { renderProjects, initProjects }   from '../components/projects.js';
import { renderContact, initContact }     from '../components/contact.js';
import { renderFooter, initFooter }       from '../components/footer.js';
import { initScrollAnimations }           from '../utils/animations.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderHome() {
  return [
    renderNavbar(),
    renderHero(),
    renderAbout(),
    renderProjects(),
    renderContact(),
    renderFooter(),
  ].join('');
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initHome() {
  initNavbar();
  initHero();
  initAbout();
  initProjects();
  initContact();
  initFooter();
  initScrollAnimations();
}
