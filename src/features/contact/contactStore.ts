/* ============================================================
   FEATURE: Contact — Form state and submission
   ============================================================ */

import { create } from 'zustand';
import { apiService } from '@/core/api/apiService';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactStore {
  form: ContactFormData;
  status: FormStatus;
  error: string | null;
  setField: (field: keyof ContactFormData, value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const defaultForm: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const useContactStore = create<ContactStore>((set, get) => ({
  form: defaultForm,
  status: 'idle',
  error: null,

  setField: (field, value) =>
    set((state) => ({ form: { ...state.form, [field]: value } })),

  submit: async () => {
    const { form } = get();
    set({ status: 'submitting', error: null });

    // Replace with your actual form endpoint (Formspree, custom API, etc.)
    const result = await apiService.post<{ success: boolean }>(
      'https://formspree.io/f/your-form-id',
      form,
    );

    if (result.error) {
      set({ status: 'error', error: result.error });
    } else {
      set({ status: 'success', form: defaultForm });
    }
  },

  reset: () => set({ form: defaultForm, status: 'idle', error: null }),
}));
