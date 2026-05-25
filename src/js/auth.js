/**
 * auth.js — Authentication helpers
 * Mock auth layer using localStorage JWT.
 */

const TOKEN_KEY = 'jwt_token';

/**
 * Check whether a JWT token exists in localStorage.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

/**
 * Return the stored JWT token (or null).
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Mock login — accepts any credentials, generates a fake JWT, and stores it.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function login(email, password) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 500));

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  // Generate a mock token (base-64 encoded payload)
  const payload = btoa(JSON.stringify({ email, iat: Date.now() }));
  const fakeJwt = `eyJhbGciOiJIUzI1NiJ9.${payload}.mock_signature`;
  localStorage.setItem(TOKEN_KEY, fakeJwt);

  return { success: true, message: 'Login successful.' };
}

/**
 * Log out — remove the token and redirect to the home page.
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.hash = '#/';
}

/**
 * Guard helper — if the user is not authenticated, redirect to admin login.
 * @returns {boolean} true if authenticated, false if redirected.
 */
export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.hash = '#/admin-login';
    return false;
  }
  return true;
}
