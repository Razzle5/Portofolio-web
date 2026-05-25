/**
 * pages/adminLogin.js — Admin login page
 * Centred card with email/password fields and mock authentication.
 */

import { login } from '../auth.js';
import { showToast } from '../utils/toast.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderAdminLogin() {
  return `
  <div class="auth-page">
    <div class="auth-card">
      <!-- Logo -->
      <div class="auth-card__header">
        <a href="#/" class="auth-card__logo">
          <span class="auth-card__logo-accent">&lt;</span>Farros<span class="auth-card__logo-accent">/&gt;</span>
        </a>
        <h2>Admin Login</h2>
        <p>Sign in to access the dashboard</p>
      </div>

      <!-- Form -->
      <form id="login-form" class="auth-card__form" novalidate>
        <div class="form-group">
          <label for="login-email">Email</label>
          <div class="form-group__input-wrapper">
            <i data-lucide="mail"></i>
            <input type="email" id="login-email" name="email" placeholder="admin@farros.dev" required />
          </div>
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <div class="form-group__input-wrapper">
            <i data-lucide="lock"></i>
            <input type="password" id="login-password" name="password" placeholder="••••••••" required />
          </div>
        </div>
        <button type="submit" id="login-submit" class="btn btn--primary btn--full">
          <i data-lucide="log-in"></i> Sign In
        </button>
      </form>

      <p class="auth-card__footer">
        <a href="#/">&larr; Back to website</a>
      </p>
    </div>
  </div>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initAdminLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value.trim();

    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    const submitBtn = document.getElementById('login-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    const result = await login(email, password);

    if (result.success) {
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.hash = '#/admin';
      }, 600);
    } else {
      showToast(result.message, 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="log-in"></i> Sign In';
      if (window.lucide) lucide.createIcons({ nodes: [submitBtn] });
    }
  });
}
