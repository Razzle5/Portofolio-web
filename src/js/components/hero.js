/**
 * components/hero.js — Hero section
 * Centered headline, typing-effect subtitle, CTA buttons, and
 * floating geometric background shapes.
 */

import { personalInfo } from '../data.js';
import { TypingEffect } from '../utils/typing.js';

let typingInstance = null;

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderHero() {
  // Generate floating geometric shapes for animated background
  const shapes = Array.from({ length: 8 }, (_, i) => {
    const size = 20 + Math.random() * 60;
    const left = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = 12 + Math.random() * 10;
    return `<div class="hero__shape" style="
      width:${size}px;height:${size}px;
      left:${left}%;
      animation-delay:${delay}s;
      animation-duration:${duration}s;
    "></div>`;
  }).join('');

  return `
  <section id="hero-section" class="hero">
    <!-- Animated background -->
    <div class="hero__bg">${shapes}</div>

    <div class="hero__content container" style="text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 class="hero__name animate-on-scroll" style="margin-bottom: 1rem;">Hi, I'm Farros.</h1>
      
      <p class="hero__description animate-on-scroll" style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
        <span style="color: var(--warning); font-weight: bold;">| Full Stack Web Developer.</span> Building interactive and responsive digital solutions from user interfaces to reliable backend systems.
      </p>

      <div class="hero__cta animate-on-scroll" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="/assets/cv/cv_farros.pdf" download class="btn btn-primary">
          <i data-lucide="download"></i> Download CV
        </a>
        <a href="https://github.com/Razzle5" target="_blank" rel="noopener" class="btn btn-secondary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 1.2rem; height: 1.2rem;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/farros-althaf/" target="_blank" rel="noopener" class="btn btn-secondary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 1.2rem; height: 1.2rem;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn
        </a>
      </div>
    </div>
  </section>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initHero() {
  // Static hero, no typing effect needed anymore based on screenshot
}
