/**
 * pages/adminMessages.js — Admin messages inbox
 * Message list with expand/collapse, read/unread toggle, and mock data.
 */

import { logout } from '../auth.js';
import { renderAdminSidebar } from './dashboard.js';
import { showToast } from '../utils/toast.js';

// ── Mock messages ─────────────────────────────────────────────────────────────
const mockMessages = [
  {
    id: 1,
    sender: 'John Doe',
    email: 'john@example.com',
    date: '2024-12-18',
    preview: 'Hey Farros, I loved your ERP project. Would you be open to...',
    body: 'Hey Farros, I loved your ERP project. Would you be open to discussing a freelance opportunity? We need a similar system built for our logistics company. Let me know your availability and rates. Looking forward to hearing from you!',
    read: false,
  },
  {
    id: 2,
    sender: 'Sarah Miller',
    email: 'sarah.m@techcorp.io',
    date: '2024-12-16',
    preview: 'We are looking for a network engineer to help redesign our...',
    body: 'We are looking for a network engineer to help redesign our office network across three floors. Your campus network project caught our eye. Could we set up a call this week to discuss the scope and timeline?',
    read: true,
  },
  {
    id: 3,
    sender: 'Ahmad Rizki',
    email: 'ahmad.r@startup.id',
    date: '2024-12-14',
    preview: 'Assalamualaikum, saya tertarik dengan portofolio Anda...',
    body: 'Assalamualaikum, saya tertarik dengan portofolio Anda. Kami sedang membangun startup di bidang edutech dan membutuhkan full-stack developer. Apakah Anda bersedia untuk berdiskusi lebih lanjut? Terima kasih.',
    read: false,
  },
  {
    id: 4,
    sender: 'Emily Chen',
    email: 'emily@designhub.co',
    date: '2024-12-10',
    preview: 'Great portfolio! I wanted to reach out regarding a potential...',
    body: 'Great portfolio! I wanted to reach out regarding a potential collaboration. Our design agency occasionally partners with developers for client projects. Your skill set aligns perfectly with what we need. Would you be interested in joining our freelancer network?',
    read: true,
  },
];

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderAdminMessages() {
  return `
  <div class="admin-layout">
    ${renderAdminSidebar('messages')}

    <main class="admin-content">
      <header class="admin-content__header">
        <div>
          <h1>Messages</h1>
          <p>${mockMessages.filter((m) => !m.read).length} unread messages</p>
        </div>
      </header>

      <div class="messages-list" id="messages-list">
        ${mockMessages
          .map(
            (m) => `
          <article class="message-card ${m.read ? '' : 'message-card--unread'}" data-id="${m.id}">
            <div class="message-card__header">
              <div class="message-card__sender">
                <div class="message-card__avatar">${m.sender.charAt(0)}</div>
                <div>
                  <strong>${m.sender}</strong>
                  <span class="message-card__email">${m.email}</span>
                </div>
              </div>
              <div class="message-card__meta">
                <span class="message-card__date">${m.date}</span>
                <button class="icon-btn message-card__toggle-read" data-id="${m.id}" aria-label="Toggle read"
                        title="${m.read ? 'Mark as unread' : 'Mark as read'}">
                  <i data-lucide="${m.read ? 'mail-open' : 'mail'}"></i>
                </button>
              </div>
            </div>
            <p class="message-card__preview">${m.preview}</p>
            <div class="message-card__body" hidden>
              <p>${m.body}</p>
            </div>
          </article>`,
          )
          .join('')}
      </div>
    </main>
  </div>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initAdminMessages() {
  // Logout
  document.getElementById('admin-logout')?.addEventListener('click', logout);

  const list = document.getElementById('messages-list');
  if (!list) return;

  list.addEventListener('click', (e) => {
    // ── Toggle read/unread ──────────────────────────────────────────────
    const readBtn = e.target.closest('.message-card__toggle-read');
    if (readBtn) {
      e.stopPropagation();
      const card = readBtn.closest('.message-card');
      const isUnread = card.classList.toggle('message-card--unread');
      readBtn.title = isUnread ? 'Mark as read' : 'Mark as unread';

      // Swap icon
      const icon = readBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isUnread ? 'mail' : 'mail-open');
        if (window.lucide) lucide.createIcons({ nodes: [readBtn] });
      }

      showToast(isUnread ? 'Marked as unread' : 'Marked as read', 'info', 1500);
      return;
    }

    // ── Expand / collapse message body ──────────────────────────────────
    const card = e.target.closest('.message-card');
    if (card) {
      const body = card.querySelector('.message-card__body');
      if (body) {
        body.hidden = !body.hidden;
        card.classList.toggle('message-card--expanded', !body.hidden);
      }
    }
  });
}
