/**
 * Serverless function to send emails via EmailJS
 * This bypasses the EmailJS restriction on mobile apps
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
    const { serviceId, templateId, publicKey, templateParams } = req.body;

    // Validate input
    if (!serviceId || !templateId || !publicKey || !templateParams) {
      console.error("Missing parameters:", { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey, templateParams: !!templateParams });
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    console.log("Forwarding email to EmailJS...");

    // Use fetch with error handling (Node 18+ on Vercel has native fetch)
    let response;
    let result;

    try {
      response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
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

      result = await response.json();
      console.log("EmailJS response:", response.status, result);
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      return res.status(500).json({
        success: false,
        error: "Failed to connect to EmailJS",
        details: fetchError.message
      });
    }

    if (response.ok) {
      return res.status(200).json({ success: true, result });
    } else {
      return res.status(response.status).json({ success: false, error: result });
    }
  } catch (error) {
    console.error("Error in send-email API:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
      stack: error.stack
    });
  }
}
