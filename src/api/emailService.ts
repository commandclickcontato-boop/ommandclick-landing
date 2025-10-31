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
    // Get EmailJS credentials from environment
    const serviceId = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration");
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

    // Send email via EmailJS API
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS API error:", errorText);
      return {
        success: false,
        error: "Erro ao enviar email. Por favor, tente novamente.",
      };
    }

    const result: EmailJSResponse = await response.json();

    if (result.status === 200) {
      console.log("✅ Lead email sent successfully");
      return { success: true };
    } else {
      console.error("EmailJS error:", result);
      return {
        success: false,
        error: "Erro no envio. Por favor, tente novamente.",
      };
    }
  } catch (error) {
    console.error("Failed to send lead email:", error);
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
