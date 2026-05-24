/**
 * MSC Auth & Admin Engine — roles, registration, password policy, admin directory
 * Environment-agnostic; wire mail to PHP msc_send_mail() or Node adapters in consumers.
 */

export type MscAuthRole = 'master-admin' | 'admin' | 'user';

export type MscAuthUserRow = {
  id: string | number;
  email: string;
  role: MscAuthRole;
  username?: string | null;
  avatarUrl?: string | null;
  isVerified?: boolean;
  isCurrentUser?: boolean;
};

export type MscAuthActionResult = { ok: true } | { ok: false; error: string };

export type MscAuthListUsersResult =
  | { ok: true; users: MscAuthUserRow[]; isMasterAdmin: boolean }
  | { ok: false; error: string };

export type MscRegisterInput = {
  email: string;
  password: string;
  name: string;
};

export type MscCreateUserAdminInput = {
  email: string;
  password: string;
  role: MscAuthRole;
  username?: string;
};

export type MscAuthMailAdapter = (to: string, subject: string, html: string) => Promise<boolean>;

/** Minimum password rules for signup and admin resets. */
export const MSC_PASSWORD_MIN_LENGTH = 8;

export function msc_passwordPolicyHint(): string {
  return 'At least 8 characters with one uppercase letter, one number, and one special character.';
}

export function msc_validateNewPassword(
  password: string,
): { ok: true } | { ok: false; message: string } {
  const p = password ?? '';
  if (p.length < MSC_PASSWORD_MIN_LENGTH) {
    return {
      ok: false,
      message: `Password must be at least ${MSC_PASSWORD_MIN_LENGTH} characters.`,
    };
  }
  if (!/[A-Z]/.test(p)) {
    return { ok: false, message: 'Password must include at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(p)) {
    return { ok: false, message: 'Password must include at least one number.' };
  }
  if (!/[^A-Za-z0-9]/.test(p)) {
    return { ok: false, message: 'Password must include at least one special character.' };
  }
  return { ok: true };
}

export function msc_validateEmail(
  raw: string,
): { ok: true; email: string } | { ok: false; error: string } {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, error: 'Email is required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }
  return { ok: true, email };
}

export function msc_normalizeAuthRole(role: unknown): MscAuthRole {
  if (role === 'master-admin') return 'master-admin';
  if (role === 'admin') return 'admin';
  return 'user';
}

export function msc_isValidAuthRole(role: unknown): role is MscAuthRole {
  return role === 'master-admin' || role === 'admin' || role === 'user';
}

/**
 * Role gates (mirror Payload access patterns without hardcoded operators).
 */
export function msc_canManageFullUserDirectory(actor: MscAuthRole): boolean {
  return actor === 'master-admin';
}

export function msc_canAssignMasterAdmin(actor: MscAuthRole): boolean {
  return actor === 'master-admin';
}

export function msc_canCreateUser(actor: MscAuthRole): boolean {
  return actor === 'master-admin';
}

export function msc_filterUsersForAdminView(
  users: MscAuthUserRow[],
  actor: MscAuthRole,
  currentUserId: string | number,
): MscAuthUserRow[] {
  if (msc_canManageFullUserDirectory(actor)) {
    return [...users].sort((a, b) => a.email.localeCompare(b.email));
  }
  return users.filter((u) => String(u.id) === String(currentUserId));
}

/**
 * Registration validation (consumer persists via CMS/API).
 */
export function msc_validateRegistration(
  input: MscRegisterInput,
): { ok: true; data: MscRegisterInput } | { ok: false; error: string } {
  const emailCheck = msc_validateEmail(input.email);
  if (!emailCheck.ok) return { ok: false, error: emailCheck.error };
  const pw = msc_validateNewPassword(input.password);
  if (!pw.ok) return { ok: false, error: pw.message };
  const name = input.name.trim();
  if (!name) return { ok: false, error: 'Name is required.' };
  return {
    ok: true,
    data: { email: emailCheck.email, password: input.password, name },
  };
}

/**
 * Build verification / welcome HTML via transactional wrapper contract.
 * PHP consumers: msc_build_transactional_email_template($title, $body)
 */
export function msc_buildVerificationEmailHtml(options: {
  title: string;
  verifyUrl: string;
  bodyParagraphs?: string[];
}): string {
  const paragraphs = (options.bodyParagraphs ?? ['Confirm your email to activate your account.'])
    .map((p) => `<p style="margin:0 0 12px">${p}</p>`)
    .join('');
  const cta = `<p style="margin:16px 0"><a href="${options.verifyUrl}" style="color:#e02b20;font-weight:600">Verify email</a></p>`;
  const inner = paragraphs + cta;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${options.title}</title></head>
<body style="background-color:#121212;color:#ffffff;font-family:sans-serif;padding:20px;margin:0">
<div style="max-width:600px;margin:0 auto;background-color:#1c1c1c;padding:30px;border-radius:8px;border:1px solid #2d2d2d">
<h1 style="color:#e02b20;font-size:24px;margin-top:0">${options.title}</h1>
<div style="color:#b3b3b3;line-height:1.6;font-size:16px">${inner}</div>
</div></div></body></html>`;
}

export async function msc_sendAuthTransactionalEmail(
  adapter: MscAuthMailAdapter,
  to: string,
  subject: string,
  title: string,
  bodyHtml: string,
): Promise<MscAuthActionResult> {
  const html = msc_buildVerificationEmailHtml({
    title,
    verifyUrl: '#',
    bodyParagraphs: [bodyHtml.replace(/<[^>]+>/g, '')],
  });
  const sent = await adapter(to, subject, html);
  return sent ? { ok: true } : { ok: false, error: 'Unable to send email.' };
}

/**
 * Simplified account dashboard model — single security panel (no redundant visibility cards).
 */
export type MscAccountDashboardModel = {
  user: MscAuthUserRow;
  sections: Array<'profile' | 'security'>;
};

export function msc_buildAccountDashboard(user: MscAuthUserRow): MscAccountDashboardModel {
  return {
    user,
    sections: ['profile', 'security'],
  };
}

export type MscPasswordFieldUiState = {
  value: string;
  visible: boolean;
};

export function msc_togglePasswordVisibility(
  state: MscPasswordFieldUiState,
): MscPasswordFieldUiState {
  return { ...state, visible: !state.visible };
}
