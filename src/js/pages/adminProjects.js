/**
 * pages/adminProjects.js — Admin projects CRUD
 * Table listing projects with add / edit / delete UI.
 */

import { projects } from '../data.js';
import { logout } from '../auth.js';
import { renderAdminSidebar } from './dashboard.js';
import { showToast } from '../utils/toast.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderAdminProjects() {
  return `
  <div class="admin-layout">
    ${renderAdminSidebar('projects')}

    <main class="admin-content">
      <header class="admin-content__header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <button id="add-project-btn" class="btn btn--primary">
          <i data-lucide="plus"></i> Add New Project
        </button>
      </header>

      <!-- Projects table -->
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${projects
              .map(
                (p) => `
              <tr data-id="${p.id}">
                <td>
                  <div class="admin-table__project-name">
                    <strong>${p.title}</strong>
                    <span>${p.techStack.slice(0, 3).join(', ')}</span>
                  </div>
                </td>
                <td><span class="badge badge--${p.category.toLowerCase().replace(/\s/g, '-')}">${p.category}</span></td>
                <td><span class="badge badge--published">Published</span></td>
                <td>
                  <div class="admin-table__actions">
                    <button class="icon-btn icon-btn--edit" data-action="edit" data-id="${p.id}" aria-label="Edit">
                      <i data-lucide="pencil"></i>
                    </button>
                    <button class="icon-btn icon-btn--delete" data-action="delete" data-id="${p.id}" aria-label="Delete">
                      <i data-lucide="trash-2"></i>
                    </button>
                  </div>
                </td>
              </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Add / Edit modal (UI only) -->
      <div id="project-form-modal" class="admin-modal" hidden>
        <div class="admin-modal__overlay"></div>
        <div class="admin-modal__content">
          <div class="admin-modal__header">
            <h2 id="project-modal-title">Add Project</h2>
            <button id="close-project-modal" class="icon-btn" aria-label="Close">
              <i data-lucide="x"></i>
            </button>
          </div>
          <form id="project-crud-form" class="admin-form">
            <div class="form-group">
              <label for="proj-title">Title</label>
              <input type="text" id="proj-title" name="title" placeholder="Project title" />
            </div>
            <div class="form-group">
              <label for="proj-category">Category</label>
              <select id="proj-category" name="category">
                <option value="Web App">Web App</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div class="form-group">
              <label for="proj-description">Description</label>
              <textarea id="proj-description" name="description" rows="4" placeholder="Short description"></textarea>
            </div>
            <div class="form-group">
              <label for="proj-tech">Tech Stack (comma separated)</label>
              <input type="text" id="proj-tech" name="techStack" placeholder="Laravel, MySQL, Docker" />
            </div>
            <button type="submit" class="btn btn--primary btn--full">Save Project</button>
          </form>
        </div>
      </div>
    </main>
  </div>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initAdminProjects() {
  // Logout
  document.getElementById('admin-logout')?.addEventListener('click', logout);

  const formModal = document.getElementById('project-form-modal');
  const modalTitle = document.getElementById('project-modal-title');
  const closeModalBtn = document.getElementById('close-project-modal');
  const addBtn = document.getElementById('add-project-btn');
  const form = document.getElementById('project-crud-form');

  // Open add-project modal
  addBtn?.addEventListener('click', () => {
    modalTitle.textContent = 'Add Project';
    form.reset();
    formModal.hidden = false;
    if (window.lucide) lucide.createIcons({ nodes: [formModal] });
  });

  // Close modal
  closeModalBtn?.addEventListener('click', () => (formModal.hidden = true));
  formModal?.querySelector('.admin-modal__overlay')?.addEventListener('click', () => (formModal.hidden = true));

  // Table actions
  document.querySelector('.admin-table')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);
    const project = projects.find((p) => p.id === id);

    if (action === 'edit' && project) {
      modalTitle.textContent = 'Edit Project';
      document.getElementById('proj-title').value = project.title;
      document.getElementById('proj-category').value = project.category;
      document.getElementById('proj-description').value = project.description;
      document.getElementById('proj-tech').value = project.techStack.join(', ');
      formModal.hidden = false;
      if (window.lucide) lucide.createIcons({ nodes: [formModal] });
    }

    if (action === 'delete') {
      showToast(`Project "${project?.title}" deleted (mock).`, 'info');
    }
  });

  // Form submit (mock)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Project saved successfully (mock).', 'success');
    formModal.hidden = true;
  });
}
