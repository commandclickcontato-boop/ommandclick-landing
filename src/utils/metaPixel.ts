import { Platform } from "react-native";

/**
 * Meta Pixel Configuration
 */
const META_PIXEL_ID = "9943378875750722";
const META_API_TOKEN = "EAAHICZA4RqGwBP74ZAY75JZCITUkMLBT0RJamDzikEz7hdNUnLZAlyN8y5p6yYD7zsL1dYVhAqhZBB86AHXZAhtCmKhSYayQpXbmGkXwRipKxZBZBlLYb820GJaXlx1LysAGveboEJeaZAVIXRAmyG0bwy9yKGs6jOgOS2iWnaZBvTWuqExqC7BMnBTkCDCHOqxrC6kgZDZD";

/**
 * Declare fbq function for TypeScript
 */
declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, any>) => void;
  }
}

/**
 * Check if Meta Pixel is available (web only)
 */
function isPixelAvailable(): boolean {
  return Platform.OS === "web" && typeof window !== "undefined" && typeof window.fbq === "function";
}

/**
 * Track a standard event with Meta Pixel
 *
 * Standard Events:
 * - PageView: Automatic page view
 * - ViewContent: User viewed content
 * - Lead: User submitted contact info
 * - CompleteRegistration: User completed registration
 * - Contact: User contacted business
 * - Schedule: User scheduled appointment
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (!isPixelAvailable()) {
    console.log(`[Meta Pixel] ${eventName}`, params);
    return;
  }

  try {
    window.fbq?.("track", eventName, params);
    console.log(`[Meta Pixel] Event tracked: ${eventName}`, params);
  } catch (error) {
    console.error("[Meta Pixel] Error tracking event:", error);
  }
}

/**
 * Track a custom event with Meta Pixel
 */
export function trackCustomEvent(eventName: string, params?: Record<string, any>): void {
  if (!isPixelAvailable()) {
    console.log(`[Meta Pixel Custom] ${eventName}`, params);
    return;
  }

  try {
    window.fbq?.("trackCustom", eventName, params);
    console.log(`[Meta Pixel] Custom event tracked: ${eventName}`, params);
  } catch (error) {
    console.error("[Meta Pixel] Error tracking custom event:", error);
  }
}

/**
 * Track page view
 */
export function trackPageView(pageName: string): void {
  trackEvent("PageView", { page_name: pageName });
}

/**
 * Track when user views content
 */
export function trackViewContent(contentName: string, contentType?: string): void {
  trackEvent("ViewContent", {
    content_name: contentName,
    content_type: contentType || "page",
  });
}

/**
 * Track lead submission
 */
export function trackLead(leadData: {
  fullName: string;
  workshopName: string;
  city: string;
  state: string;
}): void {
  trackEvent("Lead", {
    content_name: "Lead Form Submission",
    content_category: "lead_generation",
    workshop_name: leadData.workshopName,
    city: leadData.city,
    state: leadData.state,
  });
}

/**
 * Track contact via WhatsApp
 */
export function trackContact(method: "whatsapp" | "email"): void {
  trackEvent("Contact", {
    contact_method: method,
  });
}

/**
 * Track form start (when user begins filling form)
 */
export function trackFormStart(): void {
  trackCustomEvent("FormStart", {
    form_name: "Lead Capture Form",
  });
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location: string): void {
  trackCustomEvent("ButtonClick", {
    button_name: buttonName,
    location: location,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackCustomEvent("ScrollDepth", {
      percentage: percentage,
    });
  }
}

/**
 * Send event to Meta Conversions API (server-side tracking)
 * This is more reliable than pixel-only tracking
 */
export async function sendConversionEvent(
  eventName: string,
  eventData: Record<string, any>,
  userData?: { phone?: string; email?: string }
): Promise<boolean> {
  try {
    const url = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`;

    // Safely get location and user agent based on platform
    const eventSourceUrl = Platform.OS === "web" && typeof window !== "undefined" && window.location
      ? window.location.href
      : "app://mobile";

    const userAgent = Platform.OS === "web" && typeof navigator !== "undefined"
      ? navigator.userAgent
      : `React-Native/${Platform.OS}`;

    const userDataPayload: Record<string, any> = {
      client_user_agent: userAgent,
    };

    // Add phone and email if provided
    if (userData?.phone) {
      userDataPayload.ph = userData.phone;
    }
    if (userData?.email) {
      userDataPayload.em = userData.email;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: Platform.OS === "web" ? "website" : "app",
            event_source_url: eventSourceUrl,
            user_data: userDataPayload,
            custom_data: eventData,
          },
        ],
        access_token: META_API_TOKEN,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("[Meta Conversions API] Event sent successfully:", eventName);
      return true;
    } else {
      console.error("[Meta Conversions API] Error:", result);
      return false;
    }
  } catch (error) {
    console.error("[Meta Conversions API] Error sending event:", error);
    return false;
  }
}

/**
 * Hash a string using SHA-256 (for Meta Conversions API)
 */
async function sha256(text: string): Promise<string> {
  // Normalize: lowercase and trim
  const normalized = text.toLowerCase().trim();

  // Check if we're in a web environment with crypto support
  if (Platform.OS === "web" && typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  // For mobile, we'll skip hashing for now (or return empty)
  // The Meta Pixel will still track on web via browser pixel
  return "";
}

/**
 * Hash phone number for Meta API
 */
async function hashPhone(phone: string): Promise<string> {
  // Remove all non-digits and add country code if not present
  const cleaned = phone.replace(/\D/g, "");
  const withCountryCode = cleaned.startsWith("55") ? cleaned : `55${cleaned}`;

  // Hash the phone number
  return await sha256(withCountryCode);
}

/**
 * Track lead with both Pixel and Conversions API (recommended)
 */
export async function trackLeadDual(leadData: {
  fullName: string;
  workshopName: string;
  city: string;
  state: string;
  whatsapp: string;
}): Promise<void> {
  // Track with browser pixel
  trackLead(leadData);

  // Also send to Conversions API for better tracking (web only for now)
  if (Platform.OS === "web") {
    const hashedPhone = await hashPhone(leadData.whatsapp);
    console.log("[Meta Conversions API] Phone hash generated:", hashedPhone ? "✓" : "✗");

    // Only send if we successfully hashed the phone
    if (hashedPhone) {
      await sendConversionEvent(
        "Lead",
        {
          workshop_name: leadData.workshopName,
          city: leadData.city,
          state: leadData.state,
          lead_source: "landing_page",
        },
        {
          phone: hashedPhone,
        }
      );
    } else {
      console.log("[Meta Conversions API] Skipping - unable to hash phone number");
    }
  }
}

export default {
  trackEvent,
  trackCustomEvent,
  trackPageView,
  trackViewContent,
  trackLead,
  trackContact,
  trackFormStart,
  trackButtonClick,
  trackScrollDepth,
  sendConversionEvent,
  trackLeadDual,
};
