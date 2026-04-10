/* ============================================================
   CORE — API Service (HTTP Client)
   Thin wrapper around fetch. All external calls flow through here.
   ============================================================ */

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

const DEFAULT_TIMEOUT = 8000;

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        data: null,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as T;
    return { data, error: null };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        return { data: null, error: 'Request timed out' };
      }
      return { data: null, error: err.message };
    }
    return { data: null, error: 'Unknown error' };
  }
}

export const apiService = {
  get: <T>(url: string, headers?: HeadersInit) =>
    request<T>(url, { method: 'GET', headers }),
  post: <T>(url: string, body: unknown, headers?: HeadersInit) =>
    request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }),
};
