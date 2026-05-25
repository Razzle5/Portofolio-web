/**
 * components/about.js — About & Skills section
 * Photo / bio panel + filterable skill-card grid.
 */

import { personalInfo, skills } from '../data.js';

// Colour accents per category
const CATEGORY_COLORS = {
  Frontend: 'var(--info)',
  Backend:  'var(--success)',
  DevOps:   'var(--accent-secondary)',
  Network:  'var(--warning)',
};

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderAbout() {
  const categories = ['All', ...new Set(skills.map((s) => s.category))];

  return `
  <section id="about-section" class="about section">
    <div class="container">
      
      <div class="about-content">
        <!-- Left Column: Bio / Photo -->
        <div class="about__bio animate-on-scroll" style="background: var(--bg-card); padding: var(--space-xl); border-radius: var(--radius-xl); border: 1px solid var(--border-primary);">
          <h2 style="margin-bottom: var(--space-lg); font-family: var(--font-heading); font-size: var(--text-2xl);">About Me</h2>
          
          <div class="about__photo" style="width: 120px; height: 120px; border-radius: var(--radius-xl); overflow: hidden; margin-bottom: var(--space-md); border: 2px solid var(--border-primary);">
            <img src="/assets/images/profile.jpg" alt="${personalInfo.name}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.style.display='none';" />
          </div>
          
          <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">
            ${personalInfo.aboutText}
          </p>
        </div>

        <!-- Right Column: Skills -->
        <div class="about__skills animate-on-scroll">
          
          <!-- Filter tabs -->
          <div class="about__filter-tabs filter-tabs" id="skill-filter-tabs" style="margin-bottom: var(--space-lg);">
            ${categories
              .map(
                (cat) =>
                  `<button class="filter-tab ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">${cat}</button>`,
              )
              .join('')}
          </div>

          <!-- Skill cards -->
          <div class="about__skill-grid" id="skill-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--space-md);">
            ${skills
              .map(
                (s) => `
              <div class="skill-card stagger-child" data-category="${s.category.toLowerCase()}"
                   style="--card-accent:${CATEGORY_COLORS[s.category] || 'var(--info)'}; padding: var(--space-md);">
                <div class="skill-icon" style="margin-bottom: var(--space-xs);"><i data-lucide="${s.icon}"></i></div>
                <span class="skill-card__name" style="font-size: 0.85rem;">${s.name}</span>
              </div>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initAbout() {
  const tabs = document.getElementById('skill-filter-tabs');
  const grid = document.getElementById('skill-grid');
  if (!tabs || !grid) return;

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;

    // Update active tab
    tabs.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Show/hide cards
    grid.querySelectorAll('.skill-card').forEach((card) => {
      const match = filter === 'All' || card.dataset.category === filter.toLowerCase();
      card.style.display = match ? '' : 'none';
    });
  });

  // ── 3D Hover Tilt Effect with Large Zoom ────────────────────────────────
  const photo = document.querySelector('.about__photo');
  if (photo) {
    photo.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    photo.style.transformStyle = 'preserve-3d';

    photo.addEventListener('mousemove', (e) => {
      const rect = photo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
      const rotateY = ((x - centerX) / centerX) * 15;
      
      // Menggunakan scale(1.2) untuk zoom yang lebih besar saat di-hover
      photo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
      photo.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(99, 102, 241, 0.5)`;
      photo.style.zIndex = '10'; // Pastikan photo di atas elemen lain saat di zoom
    });

    photo.addEventListener('mouseleave', () => {
      photo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      photo.style.boxShadow = 'none';
      photo.style.zIndex = '1';
      photo.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
      
      setTimeout(() => {
        photo.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
      }, 500);
    });
  }
}
