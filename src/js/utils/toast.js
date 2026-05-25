/**
 * utils/toast.js — Toast notification system
 * Renders dismissible toast messages of type success | error | info | warning.
 */

// Map each toast type to a Lucide icon name
const ICON_MAP = {
  success: 'check-circle',
  error:   'x-circle',
  info:    'info',
  warning: 'alert-triangle',
};

/**
 * Show a toast notification.
 *
 * @param {string} message           Text to display
 * @param {'success'|'error'|'info'|'warning'} [type='info']  Visual style
 * @param {number} [duration=3000]   Auto-dismiss delay in ms
 */
export function showToast(message, type = 'info', duration = 3000) {
  // Ensure the container exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  // Build toast element
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i data-lucide="${ICON_MAP[type] || 'info'}" class="toast__icon"></i>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="Dismiss">&times;</button>
  `;

  container.appendChild(toast);

  // Initialise the Lucide icon inside this toast
  if (window.lucide) lucide.createIcons({ nodes: [toast] });

  // Trigger enter animation (the CSS class is added after a microtask so the
  // browser has time to paint the element in its initial state)
  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  // ── Dismiss logic ───────────────────────────────────────────────────────
  const dismiss = () => {
    toast.classList.remove('toast--visible');
    toast.classList.add('toast--exit');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    // Fallback removal if transitionend never fires
    setTimeout(() => toast.remove(), 500);
  };

  // Manual dismiss on click
  toast.querySelector('.toast__close').addEventListener('click', dismiss);
  toast.addEventListener('click', dismiss);

  // Auto-dismiss
  setTimeout(dismiss, duration);
}
