/**
 * utils/typing.js — Typing Effect
 * Cycles through an array of words, typing and deleting each one character
 * at a time with configurable speed and pause duration.
 */

export class TypingEffect {
  /**
   * @param {string}   selector     CSS selector for the target element
   * @param {string[]} words        Words to cycle through
   * @param {number}   [typeSpeed=100]   ms per character when typing
   * @param {number}   [deleteSpeed=50]  ms per character when deleting
   * @param {number}   [pauseTime=2000]  ms to wait after a word is fully typed
   */
  constructor(selector, words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
    this.element = document.querySelector(selector);
    this.words = words;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;

    // Internal state
    this._wordIndex = 0;
    this._charIndex = 0;
    this._isDeleting = false;
    this._timerId = null;
  }

  /** Start the animation loop. */
  start() {
    if (!this.element || !this.words.length) return;
    this.element.classList.add('typing-cursor');
    this._tick();
  }

  /** Stop the animation loop. */
  stop() {
    clearTimeout(this._timerId);
    this._timerId = null;
  }

  /* ── Internal ────────────────────────────────────────────────────────────── */

  _tick() {
    const currentWord = this.words[this._wordIndex];

    if (this._isDeleting) {
      // Remove one character
      this._charIndex--;
      this.element.textContent = currentWord.substring(0, this._charIndex);

      if (this._charIndex === 0) {
        this._isDeleting = false;
        this._wordIndex = (this._wordIndex + 1) % this.words.length;
        this._timerId = setTimeout(() => this._tick(), this.typeSpeed);
        return;
      }

      this._timerId = setTimeout(() => this._tick(), this.deleteSpeed);
    } else {
      // Add one character
      this._charIndex++;
      this.element.textContent = currentWord.substring(0, this._charIndex);

      if (this._charIndex === currentWord.length) {
        // Finished typing — pause then start deleting
        this._isDeleting = true;
        this._timerId = setTimeout(() => this._tick(), this.pauseTime);
        return;
      }

      this._timerId = setTimeout(() => this._tick(), this.typeSpeed);
    }
  }
}
