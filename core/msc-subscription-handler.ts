/**
 * MSC Subscription Handler — universal email capture, validation, and delivery bridge
 * Works in browser (fetch), Node, or PHP stacks via adapter injection.
 */

export type MscSubscriptionPayload = {
  email: string
  source?: string
  metadata?: Record<string, string>
}

export type MscSubscriptionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; code?: string }

export type MscSubscriptionSubmitAdapter = (
  payload: MscSubscriptionPayload,
) => Promise<MscSubscriptionResult>

const MSC_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Normalize and validate subscription email input.
 */
export function msc_validateSubscriptionEmail(
  raw: string,
): { valid: true; email: string } | { valid: false; error: string } {
  const email = raw.trim().toLowerCase()
  if (!email) {
    return { valid: false, error: "Please enter your email address." }
  }
  if (!MSC_EMAIL_RE.test(email)) {
    return { valid: false, error: "Please enter a valid email address." }
  }
  return { valid: true, email }
}

/**
 * Map HTTP/API error bodies to user-safe messages (no stack traces).
 */
export function msc_parseSubscriptionApiError(
  status: number,
  bodyText: string,
): string {
  const normalized = bodyText.toLowerCase()
  if (
    status === 409 ||
    normalized.includes("already registered") ||
    normalized.includes("already exists") ||
    normalized.includes("duplicate")
  ) {
    return "This email is already subscribed. Check your inbox for a verification message."
  }
  try {
    const json = JSON.parse(bodyText) as {
      errors?: Array<{ message?: string }>
      message?: string
    }
    const first = json.errors?.[0]?.message
    return first || json.message || "Signup failed. Please try again."
  } catch {
    return status >= 500
      ? "Server error. Please try again shortly."
      : "Signup failed. Please try again."
  }
}

/**
 * REST adapter — POST JSON to a configurable endpoint (Payload, custom API, etc.).
 */
export function msc_createRestSubscriptionAdapter(
  endpoint: string,
  init?: RequestInit,
): MscSubscriptionSubmitAdapter {
  return async (payload) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      body: JSON.stringify({
        email: payload.email,
        source: payload.source || "web",
        ...payload.metadata,
      }),
      ...init,
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return {
        ok: false,
        error: msc_parseSubscriptionApiError(res.status, text),
        code: String(res.status),
      }
    }
    return {
      ok: true,
      message: "Check your inbox to verify your email.",
    }
  }
}

/**
 * PHP / WordPress bridge contract (call from server after loading msc-communications.php):
 *
 * ```php
 * $valid = msc_validate_subscription_email_php($email); // mirror regex in PHP
 * msc_send_mail($admin, 'New subscriber', msc_build_transactional_email_template(...));
 * ```
 */

export type MscSubscriptionFormState = {
  email: string
  error: string | null
  success: string | null
  submitting: boolean
}

export const MSC_SUBSCRIPTION_INITIAL_STATE: MscSubscriptionFormState = {
  email: "",
  error: null,
  success: null,
  submitting: false,
}

/**
 * Async submission orchestrator for React/Vanilla handlers.
 */
export async function msc_submitSubscription(
  rawEmail: string,
  adapter: MscSubscriptionSubmitAdapter,
  options?: { source?: string; metadata?: Record<string, string> },
): Promise<MscSubscriptionFormState> {
  const check = msc_validateSubscriptionEmail(rawEmail)
  if (!check.valid) {
    return {
      ...MSC_SUBSCRIPTION_INITIAL_STATE,
      email: rawEmail,
      error: check.error,
    }
  }

  try {
    const result = await adapter({
      email: check.email,
      source: options?.source,
      metadata: options?.metadata,
    })
    if (!result.ok) {
      return {
        email: check.email,
        error: result.error,
        success: null,
        submitting: false,
      }
    }
    return {
      email: "",
      error: null,
      success: result.message,
      submitting: false,
    }
  } catch {
    return {
      email: check.email,
      error: "Something went wrong. Please try again.",
      success: null,
      submitting: false,
    }
  }
}

/**
 * Optional notification email after successful API capture (Node — requires nodemailer/wp_mail bridge in consumer).
 */
export async function msc_notifySubscriptionCaptured(
  adminEmail: string,
  subscriberEmail: string,
  sendMail: (to: string, subject: string, html: string) => Promise<boolean>,
): Promise<void> {
  const subject = "New subscription capture"
  const body = `<p>New subscriber: <strong>${subscriberEmail}</strong></p>`
  const html =
    typeof globalThis !== "undefined" &&
    "msc_build_transactional_email_template" in globalThis
      ? // consumer may inject PHP-rendered HTML server-side
        body
      : `<div style="background:#121212;color:#fff;padding:24px;font-family:sans-serif">${body}</div>`
  await sendMail(adminEmail, subject, html)
}
