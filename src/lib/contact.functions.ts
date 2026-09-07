import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";
import { contact, site } from "@/content/site";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_API_URL = "https://api.resend.com/emails";
const MIN_FORM_COMPLETION_MS = 3_000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1_000;

type TurnstileResult = {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
};

async function verifyTurnstileToken(token: string) {
  const secret = process.env["TURNSTILE_SECRET_KEY"];
  if (!secret) throw new Error("Contact form anti-spam protection is not configured.");

  const body = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error("Unable to verify the security check.");

  const result = (await response.json()) as TurnstileResult;
  if (!result.success || result.action !== "contact") {
    console.warn("[contact] Turnstile verification failed", result["error-codes"]);
    throw new Error("Security check failed. Please try again.");
  }
}

function env(key: string): string {
  return process.env[key] ?? "";
}

/**
 * Delivers a validated contact request to the doctor's inbox via the Resend
 * email API. Requires RESEND_API_KEY and a verified RESEND_FROM_EMAIL in the
 * deploy environment. Falls back to contact.email when RESEND_TO_EMAIL unset.
 */
async function deliverEmail(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) throw new Error("Contact form delivery is not configured.");

  const from = env("RESEND_FROM_EMAIL");
  if (!from) throw new Error("Contact form sender is not configured.");

  const to = env("RESEND_TO_EMAIL") || contact.email;
  const fromName = env("RESEND_FROM_NAME") || site.title;

  const text = [
    `New message from the ${site.title} contact form.`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    "",
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.5">
      <p style="margin:0 0 16px"><strong>New message from the ${site.title} contact form.</strong></p>
      <table cellpadding="0" cellspacing="0" style="font-size:14px">
        <tr><td style="padding:4px 8px 4px 0;color:#64748b">Name</td><td>${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding:4px 8px 4px 0;color:#64748b">Email</td><td>${escapeHtml(input.email)}</td></tr>
        <tr><td style="padding:4px 8px 4px 0;color:#64748b">Phone</td><td>${escapeHtml(input.phone)}</td></tr>
        <tr><td style="padding:4px 8px 4px 0;color:#64748b">Subject</td><td>${escapeHtml(input.subject)}</td></tr>
      </table>
      <p style="margin:16px 0 4px;color:#64748b">Message</p>
      <p style="margin:0 0 24px;white-space:pre-wrap">${escapeHtml(input.message)}</p>
      <p style="font-size:12px;color:#94a3b8">Received ${new Date().toISOString()}</p>
    </div>
  `;

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${from}>`,
      to: [to],
      subject: `[Website] ${input.subject}`,
      text,
      html,
      reply_to: input.email,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[contact] Resend delivery failed", response.status, detail);
    throw new Error("Unable to deliver your message. Please try again.");
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[ch] ?? ch;
  });
}

/**
 * Handles validated contact requests: verifies the Turnstile token, then sends
 * the inquiry to the doctor's inbox through Resend.
 */
export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot fields are invisible to people but commonly populated by bots.
    if (data.website) return { ok: true as const };

    const elapsed = Date.now() - data.formStartedAt;
    if (elapsed < MIN_FORM_COMPLETION_MS || elapsed > MAX_FORM_AGE_MS) {
      throw new Error("Please complete the form again.");
    }
    await verifyTurnstileToken(data.turnstileToken);
    await deliverEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    return { ok: true as const };
  });
