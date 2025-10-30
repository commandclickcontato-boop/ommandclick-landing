import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LeadFormData } from "../types/form";

interface FormState {
  formData: LeadFormData;
  isSubmitted: boolean;
  setFormData: (data: Partial<LeadFormData>) => void;
  submitForm: () => void;
  resetForm: () => void;
}

const initialFormData: LeadFormData = {
  fullName: "",
  workshopName: "",
  city: "",
  state: "",
  numberOfMechanics: "",
  whatsapp: "",
  preferredContactTime: "",
  acceptsMarketing: false,
};

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      formData: initialFormData,
      isSubmitted: false,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      submitForm: () =>
        set({
          isSubmitted: true,
        }),
      resetForm: () =>
        set({
          formData: initialFormData,
          isSubmitted: false,
        }),
    }),
    {
      name: "command-click-form",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
