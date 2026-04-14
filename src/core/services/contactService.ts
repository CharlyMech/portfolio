import { apiService } from '@/core/services/apiService';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Replace with your actual form endpoint (Formspree, custom API, etc.)
const CONTACT_ENDPOINT = 'https://formspree.io/f/your-form-id';

export async function submitContactForm(
  form: ContactFormData,
): Promise<{ success: boolean; error: string | null }> {
  const result = await apiService.post<{ success: boolean }>(CONTACT_ENDPOINT, form);
  if (result.error) return { success: false, error: result.error };
  return { success: true, error: null };
}
