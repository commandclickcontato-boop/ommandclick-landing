/**
 * Serverless function to send emails via EmailJS
 * This bypasses the EmailJS restriction on mobile apps
 * Deploy this to Vercel as an API endpoint
 */

interface EmailRequest {
  serviceId: string;
  templateId: string;
  publicKey: string;
  templateParams: Record<string, any>;
}

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { serviceId, templateId, publicKey, templateParams }: EmailRequest = req.body;

    // Validate input
    if (!serviceId || !templateId || !publicKey || !templateParams) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Forward request to EmailJS API
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

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, result });
    } else {
      return res.status(response.status).json({ success: false, error: result });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
