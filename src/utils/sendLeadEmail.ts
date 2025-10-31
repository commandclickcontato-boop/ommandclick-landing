import type { LeadFormData } from "../types/form";

/**
 * Professional Email Service for Lead Capture
 * Uses Resend API for reliable email delivery across all platforms
 *
 * Setup required:
 * 1. Create account at https://resend.com/
 * 2. Generate API key
 * 3. Add EXPO_PUBLIC_RESEND_API_KEY to .env file
 * 4. Add EXPO_PUBLIC_RESEND_FROM_EMAIL to .env (e.g., onboarding@resend.dev)
 */

interface ResendEmailPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

/**
 * Send lead data via Resend API
 * Works on web, iOS, and Android without native mail client
 */
export async function sendLeadEmail(formData: LeadFormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log("[EmailService] Starting email send with Resend...");

    // Get Resend credentials from environment
    const resendApiKey = (process.env.EXPO_PUBLIC_RESEND_API_KEY as string | undefined)?.trim();
    const fromEmail = ((process.env.EXPO_PUBLIC_RESEND_FROM_EMAIL as string) || "onboarding@resend.dev").trim();
    const toEmail = "commandclick.contato@gmail.com";

    console.log("[EmailService] API Key:", resendApiKey ? "✓" : "✗");
    console.log("[EmailService] API Key length:", resendApiKey?.length || 0);
    console.log("[EmailService] API Key starts with 're_':", resendApiKey?.startsWith("re_") || false);
    console.log("[EmailService] From Email:", fromEmail);
    console.log("[EmailService] To Email:", toEmail);

    // Validate environment variables
    if (!resendApiKey) {
      console.error("[EmailService] Missing Resend API key");
      return {
        success: false,
        error: "Configuração de email não encontrada. Configure EXPO_PUBLIC_RESEND_API_KEY.",
      };
    }

    // Format contact time
    const contactTime =
      formData.preferredContactTime === "morning" ? "Manhã" : "Tarde";

    // Create HTML email body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .section-title { color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
    .info-row { display: flex; margin-bottom: 12px; }
    .label { font-weight: bold; width: 180px; color: #555; }
    .value { color: #333; }
    .footer { text-align: center; color: #888; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎯 Novo Lead Command Click</h1>
      <p style="margin: 10px 0 0 0;">${formData.workshopName}</p>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title">👤 Informações de Contato</div>
        <div class="info-row">
          <span class="label">Nome Completo:</span>
          <span class="value">${formData.fullName}</span>
        </div>
        <div class="info-row">
          <span class="label">WhatsApp:</span>
          <span class="value">${formData.whatsapp}</span>
        </div>
        <div class="info-row">
          <span class="label">Melhor Horário:</span>
          <span class="value">${contactTime}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🏢 Informações da Oficina</div>
        <div class="info-row">
          <span class="label">Nome da Oficina:</span>
          <span class="value">${formData.workshopName}</span>
        </div>
        <div class="info-row">
          <span class="label">Localização:</span>
          <span class="value">${formData.city}, ${formData.state}</span>
        </div>
        <div class="info-row">
          <span class="label">Número de Mecânicos:</span>
          <span class="value">${formData.numberOfMechanics}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">📊 Informações Adicionais</div>
        <div class="info-row">
          <span class="label">Aceita Marketing:</span>
          <span class="value">${formData.acceptsMarketing ? "✅ Sim" : "❌ Não"}</span>
        </div>
        <div class="info-row">
          <span class="label">Data/Hora:</span>
          <span class="value">${new Date().toLocaleString("pt-BR", {
            dateStyle: "full",
            timeStyle: "short",
          })}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Este lead foi gerado através da Landing Page do Command Click</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    console.log("[EmailService] Calling Resend API...");

    // Call Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `🎯 Novo Lead: ${formData.workshopName} - ${formData.city}/${formData.state}`,
        html: htmlBody,
      }),
    });

    console.log("[EmailService] Response status:", response.status);
    console.log("[EmailService] Response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[EmailService] Resend API error:", errorData);
      return {
        success: false,
        error: `Erro ao enviar email: ${errorData.message || "Tente novamente"}`,
      };
    }

    const result = await response.json();
    console.log("[EmailService] Email sent successfully! ID:", result.id);

    return { success: true };
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
