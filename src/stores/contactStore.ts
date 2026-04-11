/* ============================================================
   Contact — Zustand store
   ============================================================ */

import { create } from 'zustand';
import { submitContactForm } from '@/services/contact.service';
import type { ContactFormData } from '@/services/contact.service';

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
    const { success, error } = await submitContactForm(form);
    if (!success) {
      set({ status: 'error', error });
    } else {
      set({ status: 'success', form: defaultForm });
    }
  },

  reset: () => set({ form: defaultForm, status: 'idle', error: null }),
}));
