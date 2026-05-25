/**
 * api.js — API client helper
 * Provides get / post / put / del convenience wrappers.
 * Currently stubs that resolve with local data; ready for a real backend swap.
 */

const BASE_URL = '/api'; // change when a real API is available

/**
 * Retrieve the JWT bearer token stored in localStorage (if any).
 * @returns {Object} Headers object with Authorization when a token exists.
 */
function authHeaders() {
  const token = localStorage.getItem('jwt_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Generic request wrapper. In production this would call `fetch`;
 * for now it returns stub responses so the SPA works offline.
 *
 * @param {string} method  HTTP method
 * @param {string} url     Endpoint path (appended to BASE_URL)
 * @param {*}      [body]  JSON-serialisable payload
 * @returns {Promise<any>}
 */
async function request(method, url, body = null) {
  try {
    const options = {
      method,
      headers: authHeaders(),
    };
    if (body) options.body = JSON.stringify(body);

    // ── Stub mode — simulate network latency then return mock response ──
    await new Promise((r) => setTimeout(r, 300));

    // Return a generic success envelope
    return { success: true, data: body || {} };

    // When a real backend is available, uncomment the following:
    // const res = await fetch(`${BASE_URL}${url}`, options);
    // if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // return await res.json();
  } catch (err) {
    console.error(`[API] ${method} ${url} failed:`, err);
    return { success: false, error: err.message };
  }
}

/* ── Public helpers ────────────────────────────────────────────────────────── */

export function get(url)            { return request('GET',    url); }
export function post(url, data)     { return request('POST',   url, data); }
export function put(url, data)      { return request('PUT',    url, data); }
export function del(url)            { return request('DELETE', url); }
