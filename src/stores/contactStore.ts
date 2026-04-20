import { create } from 'zustand';
import type { FormStatus } from '@/core/services/contactService';

export type { FormStatus };

interface ContactFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactStore {
  form: ContactFormFields;
  status: FormStatus;
  setField: (field: keyof ContactFormFields, value: string) => void;
  setStatus: (status: FormStatus) => void;
  reset: () => void;
}

const defaultForm: ContactFormFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const useContactStore = create<ContactStore>((set) => ({
  form: defaultForm,
  status: 'idle',

  setField: (field, value) =>
    set((state) => ({ form: { ...state.form, [field]: value } })),

  setStatus: (status) => set({ status }),

  reset: () => set({ form: defaultForm, status: 'idle' }),
}));
