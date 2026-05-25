/**
 * components/contact.js — Contact form section
 * Two-column layout: info cards + validated contact form with toast feedback.
 */

import { personalInfo, socialLinks } from '../data.js';
import { post } from '../api.js';
import { showToast } from '../utils/toast.js';

/* ── Render ────────────────────────────────────────────────────────────────── */

export function renderContact() {
  return `
  <section id="contact-section" class="contact section">
    <div class="container">
      <!-- Section header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-header__title" style="font-family: var(--font-heading); font-size: var(--text-2xl); margin-bottom: 0.5rem;">Get in Touch</h2>
        <p class="section-header__subtitle" style="color: var(--text-secondary);">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>
      </div>

      <div class="contact-content animate-on-scroll">
        <!-- Left: info cards -->
        <div class="contact-info">
          <!-- Email card -->
          <div class="contact-item">
            <div class="contact-icon">
              <i data-lucide="mail"></i>
            </div>
            <div>
              <div class="contact-label">Email</div>
              <a href="mailto:${personalInfo.email}" class="contact-value">${personalInfo.email}</a>
            </div>
          </div>

          <!-- Location card -->
          <div class="contact-item">
            <div class="contact-icon">
              <i data-lucide="map-pin"></i>
            </div>
            <div>
              <div class="contact-label">Location</div>
              <div class="contact-value">${personalInfo.location}</div>
            </div>
          </div>

          <!-- Social links -->
          <div class="contact-info" style="flex-direction: row; gap: var(--space-md); margin-top: var(--space-md);">
            ${socialLinks
              .map(
                (s) =>
                  `<a href="${s.url}" target="_blank" rel="noopener" class="contact-icon" style="width: 40px; height: 40px;" aria-label="${s.name}">
                    ${s.icon}
                  </a>`,
              )
              .join('')}
          </div>
        </div>

        <!-- Right: form -->
        <form id="contact-form" class="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">Name</label>
              <input type="text" id="contact-name" name="name" class="input" placeholder="Your name" required />
            </div>
            <div class="form-group">
              <label for="contact-email" class="form-label">Email</label>
              <input type="email" id="contact-email" name="email" class="input" placeholder="you@example.com" required />
            </div>
          </div>
          <div class="form-group">
            <label for="contact-message" class="form-label">Message</label>
            <textarea id="contact-message" name="message" class="textarea" rows="5" placeholder="Your message..." required></textarea>
          </div>
          <button type="submit" id="contact-submit" class="btn btn-primary" style="align-self: flex-start; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <span class="btn__text" style="display: flex; align-items: center;"><i data-lucide="send" style="width: 1.2rem; height: 1.2rem; margin-right: 0.5rem;"></i> Send Message</span>
            <span class="btn__loader" hidden>Sending...</span>
          </button>
        </form>
      </div>
    </div>
  </section>`;
}

/* ── Init ──────────────────────────────────────────────────────────────────── */

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    // ── Validation ──────────────────────────────────────────────────────
    if (!name || !email || !message) {
      showToast('Please fill in all fields.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }

    // ── Submit ──────────────────────────────────────────────────────────
    const submitBtn = document.getElementById('contact-submit');
    const btnText = submitBtn.querySelector('.btn__text');
    const btnLoader = submitBtn.querySelector('.btn__loader');

    submitBtn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;

    try {
      // Send real email using FormSubmit AJAX API
      const response = await fetch('https://formsubmit.co/ajax/althafarros05@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name}`
        })
      });

      const res = await response.json();

      if (res.success === "true" || res.success === true) {
        showToast('Message sent successfully! I will get back to you soon.', 'success');
        form.reset();
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      submitBtn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
    }
  });
}
