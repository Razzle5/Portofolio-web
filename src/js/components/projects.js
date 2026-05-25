/**
 * components/projects.js — Projects showcase section
 * Filterable project cards grid with hover effects.
 */

import { projects } from '../data.js';
import { openProjectModal } from './projectModal.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderProjects() {
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  return `
  <section id="projects-section" class="projects">
    <div class="container">
      <!-- Section header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-header__title" style="font-family: var(--font-heading); font-size: var(--text-2xl); margin-bottom: 0.5rem;">PROJECTS</h2>
        <p class="section-header__subtitle" style="color: var(--text-secondary);">
          Curated works and experimental side-hustles.
        </p>
      </div>

      <!-- Filter tabs -->
      <div class="projects__filter-tabs filter-tabs animate-on-scroll" id="project-filter-tabs">
        ${categories
          .map(
            (cat) =>
              `<button class="filter-tab ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">${cat}</button>`,
          )
          .join('')}
      </div>

      <!-- Project cards grid -->
      <div class="projects-grid" id="projects-grid">
        ${projects
          .map(
            (p) => `
          <article class="project-card animate-on-scroll stagger-child" data-category="${p.category}" data-id="${p.id}" style="cursor: pointer;">
            <!-- Thumbnail -->
            <div class="project-thumbnail">
              <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" onerror="this.style.display='none';" />
            </div>

            <!-- Body -->
            <div class="project-content">
              <h3 class="project-title">${p.title}</h3>
              <p class="project-description">${p.description}</p>

              <div class="project-tags">
                ${p.techStack.map((t) => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initProjects() {
  const filterTabs = document.getElementById('project-filter-tabs');
  const grid = document.getElementById('projects-grid');
  if (!filterTabs || !grid) return;

  // ── Category filter ─────────────────────────────────────────────────────
  filterTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;

    filterTabs.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    grid.querySelectorAll('.project-card').forEach((card) => {
      const match = filter === 'All' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });

  // ── Open modal on card click / "View Details" ───────────────────────────
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-card__link');
    if (btn) {
      const id = Number(btn.dataset.projectId);
      openProjectModal(id);
      return;
    }

    // Also allow clicking anywhere on the card
    const card = e.target.closest('.project-card');
    if (card) {
      const id = Number(card.dataset.id);
      openProjectModal(id);
    }
  });

  // ── 3D Hover Tilt Effect on Cards ───────────────────────────────────────
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    card.style.transformStyle = 'preserve-3d';
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-4px)`;
      // Glow lebih terang (0.6) dan radius lebih lebar (60px)
      card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 60px rgba(99, 102, 241, 0.6)`;
      card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)';
      card.style.boxShadow = ''; // Reset back to CSS default
      card.style.zIndex = '1';
      card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
      
      setTimeout(() => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
      }, 500);
    });
  });
}
