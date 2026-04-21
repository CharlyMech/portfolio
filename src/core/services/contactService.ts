export type FormStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error'
  | 'rate_limited'
  | 'network_error'
  | 'server_error';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  project: string;
}

const CONTACT_ENDPOINT = '/api/contact';
const TIMEOUT_MS = 8000;

export async function sendContact(data: ContactFormData): Promise<FormStatus> {

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status === 200) return 'success';
    if (res.status === 429) return 'rate_limited';
    if (res.status >= 500) return 'server_error';
    return 'error';
  } catch {
    clearTimeout(timeout);
    return 'network_error';
  }
}
