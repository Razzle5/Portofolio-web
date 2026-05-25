/**
 * router.js — Hash-based SPA Router
 * Supports parameterised routes (e.g. /#/project/:id), programmatic
 * navigation, and automatic fallback to the home route.
 */

export class Router {
  /**
   * @param {Object.<string, Function>} routes — Map of route patterns to handler fns
   *   Pattern examples: '/', '/project/:id', '/admin/projects'
   */
  constructor(routes = {}) {
    /** @type {Object.<string, {handler: Function, paramNames: string[], regex: RegExp}>} */
    this._routes = {};
    this._currentRoute = null;

    // Pre-compile each pattern into a regex + param-name list
    Object.entries(routes).forEach(([pattern, handler]) => {
      const paramNames = [];
      // Turn '/project/:id' → '^/project/([^/]+)$'
      const regexStr = pattern
        .replace(/:([^/]+)/g, (_match, paramName) => {
          paramNames.push(paramName);
          return '([^/]+)';
        });
      this._routes[pattern] = {
        handler,
        paramNames,
        regex: new RegExp(`^${regexStr}$`),
      };
    });

    // Bind the hashchange listener
    this._onHashChange = this._onHashChange.bind(this);
    window.addEventListener('hashchange', this._onHashChange);
  }

  /* ── Public API ─────────────────────────────────────────────────────────── */

  /** Kick-start the router by processing the current hash. */
  init() {
    this._onHashChange();
  }

  /** Navigate to a new hash path programmatically. */
  navigate(path) {
    window.location.hash = `#${path}`;
  }

  /** Return the raw hash path (without the leading '#'). */
  getCurrentRoute() {
    return this._currentRoute || '/';
  }

  /** Remove the hashchange listener (cleanup). */
  destroy() {
    window.removeEventListener('hashchange', this._onHashChange);
  }

  /* ── Internal ───────────────────────────────────────────────────────────── */

  /** Fired on every hash change — matches the path against registered routes. */
  _onHashChange() {
    const hash = window.location.hash.slice(1) || '/'; // strip leading '#'
    this._currentRoute = hash;

    for (const pattern of Object.keys(this._routes)) {
      const { handler, paramNames, regex } = this._routes[pattern];
      const match = hash.match(regex);

      if (match) {
        // Build a params object from captured groups
        const params = {};
        paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        handler(params);
        return;
      }
    }

    // No match — fallback to home
    this.navigate('/');
  }
}
