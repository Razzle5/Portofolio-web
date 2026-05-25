/**
 * utils/animations.js — Scroll-triggered animations
 * Uses Intersection Observer to add a `.visible` class when `.animate-on-scroll`
 * elements enter the viewport. Supports staggered child animations.
 */

let observer = null;

/**
 * Initialise (or re-initialise) scroll animations.
 * Call this after new content is rendered into the DOM.
 */
export function initScrollAnimations() {
  // Clean up any previous observer
  cleanupScrollAnimations();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Staggered children: elements with [data-stagger] get a per-child delay
          const staggerChildren = entry.target.querySelectorAll('.stagger-child');
          staggerChildren.forEach((child, i) => {
            child.style.transitionDelay = `${i * 100}ms`;
            child.classList.add('visible');
          });

          // Once animated, stop observing to save resources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Disconnect the current observer (cleanup).
 */
export function cleanupScrollAnimations() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
