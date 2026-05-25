/**
 * pages/dashboard.js — Admin dashboard
 * Sidebar layout with stat cards and recent activity.
 */

import { logout } from '../auth.js';

/* ── Shared admin sidebar (used by all admin pages) ────────────────────────── */

export function renderAdminSidebar(activePage = 'dashboard') {
  const navItems = [
    { id: 'dashboard',  label: 'Dashboard',  icon: 'layout-dashboard', hash: '#/admin' },
    { id: 'projects',   label: 'Projects',   icon: 'folder-kanban',    hash: '#/admin/projects' },
    { id: 'messages',   label: 'Messages',   icon: 'mail',             hash: '#/admin/messages' },
  ];

  return `
  <aside class="admin-sidebar">
    <div class="admin-sidebar__header">
      <a href="#/" class="admin-sidebar__logo">
        <span class="admin-sidebar__logo-accent">&lt;</span>F<span class="admin-sidebar__logo-accent">/&gt;</span>
      </a>
      <span class="admin-sidebar__title">Admin</span>
    </div>

    <nav class="admin-sidebar__nav">
      ${navItems
        .map(
          (item) => `
        <a href="${item.hash}" class="admin-sidebar__link ${activePage === item.id ? 'admin-sidebar__link--active' : ''}">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
        </a>`,
        )
        .join('')}
    </nav>

    <button id="admin-logout" class="admin-sidebar__logout">
      <i data-lucide="log-out"></i>
      <span>Logout</span>
    </button>
  </aside>`;
}

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderDashboard() {
  return `
  <div class="admin-layout">
    ${renderAdminSidebar('dashboard')}

    <main class="admin-content">
      <header class="admin-content__header">
        <h1>Dashboard</h1>
        <p>Welcome back, Farros</p>
      </header>

      <!-- Stat cards -->
      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--blue"><i data-lucide="folder-kanban"></i></div>
          <div class="stat-card__data">
            <span class="stat-card__value">3</span>
            <span class="stat-card__label">Total Projects</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--green"><i data-lucide="mail"></i></div>
          <div class="stat-card__data">
            <span class="stat-card__value">5</span>
            <span class="stat-card__label">Messages</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--purple"><i data-lucide="eye"></i></div>
          <div class="stat-card__data">
            <span class="stat-card__value">1.2K</span>
            <span class="stat-card__label">Views</span>
          </div>
        </div>
      </div>

      <!-- Recent activity -->
      <section class="admin-activity">
        <h2>Recent Activity</h2>
        <ul class="admin-activity__list">
          <li class="admin-activity__item">
            <div class="admin-activity__dot admin-activity__dot--green"></div>
            <div>
              <p><strong>New message</strong> from John Doe</p>
              <span class="admin-activity__time">2 hours ago</span>
            </div>
          </li>
          <li class="admin-activity__item">
            <div class="admin-activity__dot admin-activity__dot--blue"></div>
            <div>
              <p><strong>Project updated:</strong> Enterprise ERP System</p>
              <span class="admin-activity__time">5 hours ago</span>
            </div>
          </li>
          <li class="admin-activity__item">
            <div class="admin-activity__dot admin-activity__dot--purple"></div>
            <div>
              <p><strong>New visitor</strong> from Jakarta, Indonesia</p>
              <span class="admin-activity__time">1 day ago</span>
            </div>
          </li>
          <li class="admin-activity__item">
            <div class="admin-activity__dot admin-activity__dot--orange"></div>
            <div>
              <p><strong>Project created:</strong> E-Commerce Headless</p>
              <span class="admin-activity__time">3 days ago</span>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initDashboard() {
  document.getElementById('admin-logout')?.addEventListener('click', logout);
}
