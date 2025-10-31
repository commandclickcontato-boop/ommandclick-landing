/**
 * Vercel Serverless Function to send emails via Resend
 * This bypasses CORS issues when calling Resend from the browser
 */

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { formData } = req.body;

    // Validate input
    if (!formData) {
      console.error("Missing formData");
      return res.status(400).json({
        success: false,
        error: "Dados do formulário não encontrados"
      });
    }

    // Get Resend API key from environment
    const resendApiKey = process.env.EXPO_PUBLIC_RESEND_API_KEY;
    const fromEmail = process.env.EXPO_PUBLIC_RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = "commandclick.contato@gmail.com";

    if (!resendApiKey) {
      console.error("Missing Resend API key");
      return res.status(500).json({
        success: false,
        error: "Configuração de email não encontrada"
      });
    }

    // Format contact time
    const contactTime = formData.preferredContactTime === "morning" ? "Manhã" : "Tarde";

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

    console.log("Calling Resend API...");

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

    console.log("Resend response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return res.status(response.status).json({
        success: false,
        error: `Erro ao enviar email: ${errorData.message || "Tente novamente"}`
      });
    }

    const result = await response.json();
    console.log("Email sent successfully! ID:", result.id);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error in send-email API:", error);
    return res.status(500).json({
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
      details: error.message
    });
  }
}
