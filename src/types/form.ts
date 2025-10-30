export interface LeadFormData {
  fullName: string;
  workshopName: string;
  city: string;
  state: string;
  numberOfMechanics: "3-4" | "5-8" | "9+" | "";
  whatsapp: string;
  preferredContactTime: "morning" | "afternoon" | "";
  acceptsMarketing: boolean;
}

export interface FormErrors {
  fullName?: string;
  workshopName?: string;
  city?: string;
  state?: string;
  numberOfMechanics?: string;
  whatsapp?: string;
  preferredContactTime?: string;
}
