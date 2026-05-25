/**
 * components/navbar.js — Sticky glassmorphism navigation bar
 * Features: smooth-scroll links, active-section highlighting, mobile drawer,
 * dark/light theme toggle with localStorage persistence, shrink-on-scroll.
 */

import { socialLinks } from '../data.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderNavbar() {
  return `
  <nav id="navbar" class="navbar">
    <div class="container">
      <!-- Logo -->
      <a href="#/" class="navbar-logo">
        <span class="logo-dot">&lt;</span>Farros<span class="logo-dot">/&gt;</span>
      </a>

      <!-- Desktop nav links in a pill -->
      <ul class="navbar-nav" id="nav-links" style="background: var(--bg-card); border: 1px solid var(--border-primary); border-radius: 100px; padding: 0.5rem 1.5rem; margin: 0 auto;">
        <li><a href="#hero-section" class="nav-link active" data-section="hero-section">Home</a></li>
        <li><a href="#about-section" class="nav-link" data-section="about-section">About</a></li>
        <li><a href="#projects-section" class="nav-link" data-section="projects-section">Projects</a></li>
        <li><a href="#contact-section" class="nav-link" data-section="contact-section">Contact</a></li>
      </ul>

      <!-- Right-side actions -->
      <div class="navbar-actions">
        <!-- Theme toggle -->
        <button id="theme-toggle" class="btn-icon" aria-label="Toggle theme" style="display: flex; align-items: center; justify-content: center;">
          <i data-lucide="moon" class="theme-icon theme-icon--dark"></i>
          <i data-lucide="sun" class="theme-icon theme-icon--light" style="display: none;"></i>
        </button>

        <!-- Mobile hamburger -->
        <button id="hamburger" class="navbar-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile drawer overlay -->
    <div id="mobile-drawer" class="mobile-nav">
      <div class="mobile-nav__content" style="display: flex; flex-direction: column; gap: var(--space-xl);">
        <ul class="mobile-nav__links" style="display: flex; flex-direction: column; gap: var(--space-md);">
          <li><a href="#hero-section" class="nav-link" data-section="hero-section">Home</a></li>
          <li><a href="#about-section" class="nav-link" data-section="about-section">About</a></li>
          <li><a href="#projects-section" class="nav-link" data-section="projects-section">Projects</a></li>
          <li><a href="#contact-section" class="nav-link" data-section="contact-section">Contact</a></li>
        </ul>
        <div class="mobile-nav__socials" style="display: flex; gap: var(--space-md);">
          ${socialLinks.map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" style="color: var(--text-primary); width: 24px; height: 24px;">${s.icon}</a>`).join('')}
        </div>
      </div>
    </div>
  </nav>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const themeToggle = document.getElementById('theme-toggle');

  if (!navbar) return;

  // ── Shrink on scroll ────────────────────────────────────────────────────
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ── Smooth-scroll links ────────────────────────────────────────────────
  document.querySelectorAll('.nav-link, .mobile-drawer__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile drawer if open
      drawer?.classList.remove('active');
      hamburger?.classList.remove('active');
    });
  });

  // ── Active link highlight via Intersection Observer ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const linkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          linkEls.forEach((l) => l.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
          activeLink?.classList.add('active');
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px' },
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  // ── Mobile hamburger toggle ─────────────────────────────────────────────
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    drawer?.classList.toggle('active');
  });

  // Close drawer on overlay click
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // ── Dark / Light theme toggle ───────────────────────────────────────────
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const iconDark = themeToggle?.querySelector('.theme-icon--dark');
  const iconLight = themeToggle?.querySelector('.theme-icon--light');
  
  if (savedTheme === 'light') {
    if (iconDark) iconDark.style.display = 'none';
    if (iconLight) iconLight.style.display = 'block';
  } else {
    if (iconDark) iconDark.style.display = 'block';
    if (iconLight) iconLight.style.display = 'none';
  }

  themeToggle?.addEventListener('click', () => {
    // Add transitioning class for smooth color fade
    document.body.classList.add('theme-transitioning');
    
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    
    // Toggle icons
    if (next === 'light') {
      if (iconDark) iconDark.style.display = 'none';
      if (iconLight) iconLight.style.display = 'block';
    } else {
      if (iconDark) iconDark.style.display = 'block';
      if (iconLight) iconLight.style.display = 'none';
    }
    
    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  });
}
