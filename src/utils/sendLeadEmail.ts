import * as MailComposer from "expo-mail-composer";
import type { LeadFormData } from "../types/form";

/**
 * Sends lead form data via email
 * Uses expo-mail-composer to open the device's email app
 */
export async function sendLeadEmail(formData: LeadFormData): Promise<boolean> {
  try {
    // Check if email is available on the device
    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      console.error("Email is not available on this device");
      // Fallback: log the data (in production, send to a backend)
      console.log("Lead form data:", formData);
      return false;
    }

    // Format the email body with lead information
    const emailBody = `
Nova Solicitação de Demonstração - Command Click
================================================

INFORMAÇÕES DO LEAD:
--------------------
Nome: ${formData.fullName}
Oficina: ${formData.workshopName}
Cidade: ${formData.city}
Estado: ${formData.state}

DETALHES DA OFICINA:
--------------------
Número de Mecânicos: ${formData.numberOfMechanics}
WhatsApp: ${formData.whatsapp}
Melhor Horário: ${formData.preferredContactTime === "morning" ? "Manhã" : "Tarde"}

MARKETING:
----------
Aceita receber novidades: ${formData.acceptsMarketing ? "Sim" : "Não"}

================================================
Data/Hora: ${new Date().toLocaleString("pt-BR")}

Este lead foi gerado através da Landing Page do Command Click.
    `.trim();

    // Prepare email options
    const options: MailComposer.MailComposerOptions = {
      recipients: ["commandclick.contato@gmail.com"],
      subject: `🎯 Novo Lead: ${formData.workshopName} - ${formData.city}/${formData.state}`,
      body: emailBody,
    };

    // Open email composer
    await MailComposer.composeAsync(options);

    return true;
  } catch (error) {
    console.error("Error sending lead email:", error);
    return false;
  }
}

/**
 * Format form data for WhatsApp message (alternative method)
 */
export function formatLeadForWhatsApp(formData: LeadFormData): string {
  return `*Nova Demonstração - Command Click*

*Dados do Lead:*
👤 Nome: ${formData.fullName}
🏢 Oficina: ${formData.workshopName}
📍 Local: ${formData.city}/${formData.state}
👨‍🔧 Mecânicos: ${formData.numberOfMechanics}
📱 WhatsApp: ${formData.whatsapp}
⏰ Horário: ${formData.preferredContactTime === "morning" ? "Manhã" : "Tarde"}`;
}
