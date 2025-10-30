import * as MailComposer from "expo-mail-composer";
import { Platform, Linking } from "react-native";
import type { LeadFormData } from "../types/form";

/**
 * Sends lead form data via email
 * Uses expo-mail-composer on mobile and mailto: link on web
 */
export async function sendLeadEmail(formData: LeadFormData): Promise<boolean> {
  try {
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

    const subject = `🎯 Novo Lead: ${formData.workshopName} - ${formData.city}/${formData.state}`;
    const recipient = "commandclick.contato@gmail.com";

    // Web platform uses mailto: link
    if (Platform.OS === "web") {
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      // Open mailto link in new window
      if (typeof window !== "undefined") {
        window.location.href = mailtoUrl;
      } else {
        await Linking.openURL(mailtoUrl);
      }

      return true;
    }

    // Mobile platforms use expo-mail-composer
    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      console.error("Email is not available on this device");
      console.log("Lead form data:", formData);
      return false;
    }

    // Prepare email options for mobile
    const options: MailComposer.MailComposerOptions = {
      recipients: [recipient],
      subject: subject,
      body: emailBody,
    };

    // Open email composer on mobile
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
