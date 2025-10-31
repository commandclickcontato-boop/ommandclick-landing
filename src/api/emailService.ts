import type { LeadFormData } from "../types/form";

/**
 * Professional Email Service for Lead Capture
 * Uses EmailJS for reliable email delivery across all platforms
 *
 * Setup required:
 * 1. Create account at https://www.emailjs.com/
 * 2. Add email service (Gmail, Outlook, etc.)
 * 3. Create email template
 * 4. Add credentials to .env file
 */

interface EmailJSResponse {
  status: number;
  text: string;
}

/**
 * Send lead data via EmailJS API
 * Works on web, iOS, and Android without native mail client
 */
export async function sendLeadEmail(formData: LeadFormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log("[EmailService] Starting email send...");

    // Get EmailJS credentials from environment
    const serviceId = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

    console.log("[EmailService] Service ID:", serviceId ? "✓" : "✗");
    console.log("[EmailService] Template ID:", templateId ? "✓" : "✗");
    console.log("[EmailService] Public Key:", publicKey ? "✓" : "✗");

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey) {
      console.error("[EmailService] Missing EmailJS configuration");
      return {
        success: false,
        error: "Configuração de email não encontrada. Por favor, configure as variáveis de ambiente.",
      };
    }

    // Format contact time
    const contactTime =
      formData.preferredContactTime === "morning" ? "Manhã" : "Tarde";

    // Prepare email template parameters
    const templateParams = {
      to_email: "commandclick.contato@gmail.com",
      from_name: formData.fullName,
      subject: `🎯 Novo Lead: ${formData.workshopName} - ${formData.city}/${formData.state}`,

      // Lead information
      full_name: formData.fullName,
      workshop_name: formData.workshopName,
      city: formData.city,
      state: formData.state,
      number_of_mechanics: formData.numberOfMechanics,
      whatsapp: formData.whatsapp,
      contact_time: contactTime,
      accepts_marketing: formData.acceptsMarketing ? "Sim" : "Não",

      // Metadata
      submission_date: new Date().toLocaleString("pt-BR", {
        dateStyle: "full",
        timeStyle: "short",
      }),
    };

    console.log("[EmailService] Template params prepared");
    console.log("[EmailService] Calling proxy API...");

    // Use proxy endpoint to send email (works on mobile and web)
    const apiEndpoint = "https://ommandclick-landing.vercel.app/api/send-email";

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId,
        templateId,
        publicKey,
        templateParams,
      }),
    });

    console.log("[EmailService] Response status:", response.status);
    console.log("[EmailService] Response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[EmailService] API error:", errorData);
      return {
        success: false,
        error: "Erro ao enviar email. Por favor, tente novamente.",
      };
    }

    const result = await response.json();
    console.log("[EmailService] Result:", result);

    if (result.success) {
      console.log("[EmailService] ✅ Lead email sent successfully");
      return { success: true };
    } else {
      console.error("[EmailService] Email send failed:", result);
      return {
        success: false,
        error: "Erro no envio. Por favor, tente novamente.",
      };
    }
  } catch (error) {
    console.error("[EmailService] Failed to send lead email:", error);
    return {
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
    };
  }
}

/**
 * Fallback: Format lead data for WhatsApp message
 * Use this if email service fails
 */
export function formatLeadForWhatsApp(formData: LeadFormData): string {
  const contactTime =
    formData.preferredContactTime === "morning" ? "Manhã" : "Tarde";

  return `*Nova Demonstração - Command Click*

*Dados do Lead:*
👤 Nome: ${formData.fullName}
🏢 Oficina: ${formData.workshopName}
📍 Local: ${formData.city}/${formData.state}
👨‍🔧 Mecânicos: ${formData.numberOfMechanics}
📱 WhatsApp: ${formData.whatsapp}
⏰ Horário: ${contactTime}`;
}

/**
 * Send lead data directly to WhatsApp (backup method)
 */
export function sendLeadToWhatsApp(formData: LeadFormData): string {
  const message = formatLeadForWhatsApp(formData);
  const whatsappNumber = "5513982111925"; // Command Click WhatsApp
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
