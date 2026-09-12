/**
 * Transport-agnostic email sending.
 *
 * Provider is chosen from the environment, so switching from Resend to an SMTP
 * mailbox (or the other way) is a change of environment variables only:
 *
 *   1. RESEND_API_KEY set  -> Resend HTTPS API (recommended on Vercel)
 *   2. SMTP_HOST set       -> SMTP via nodemailer (Zoho, Google Workspace, ...)
 *   3. neither             -> nothing is sent; the message is logged in dev
 *                             and the route reports a configuration error.
 */

import { site } from './site';

export type MailProvider = 'resend' | 'smtp' | 'none';

export type MailMessage = {
  subject: string;
  html: string;
  text: string;
  /** Overrides the default recipient. */
  to?: string;
  /** Where a reply should go — the enquirer, for enquiry notifications. */
  replyTo?: string;
};

export type MailResult =
  | { ok: true; provider: MailProvider }
  | { ok: false; provider: MailProvider; error: string };

export function getMailProvider(): MailProvider {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.SMTP_HOST) return 'smtp';
  return 'none';
}

/** Inbox that receives enquiries. Set CONTACT_TO_EMAIL in the environment. */
export function getRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || site.contact.email;
}

/**
 * Sender address. It must be on a domain you have verified with your provider,
 * otherwise the message will be rejected or filed as spam.
 */
export function getSender(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || `${site.name} Website <onboarding@resend.dev>`;
}

async function sendWithResend(message: MailMessage): Promise<MailResult> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getSender(),
      to: [message.to ?? getRecipient()],
      subject: message.subject,
      html: message.html,
      text: message.text,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    return { ok: false, provider: 'resend', error: `Resend responded ${response.status}: ${detail.slice(0, 300)}` };
  }

  return { ok: true, provider: 'resend' };
}

async function sendWithSmtp(message: MailMessage): Promise<MailResult> {
  const { default: nodemailer } = await import('nodemailer');

  const port = Number(process.env.SMTP_PORT ?? 587);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // Implicit TLS on 465; STARTTLS everywhere else.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });

  await transporter.sendMail({
    from: getSender(),
    to: message.to ?? getRecipient(),
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
  });

  return { ok: true, provider: 'smtp' };
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const provider = getMailProvider();

  try {
    if (provider === 'resend') return await sendWithResend(message);
    if (provider === 'smtp') return await sendWithSmtp(message);

    if (process.env.NODE_ENV !== 'production') {
      console.info(
        [
          '',
          '─'.repeat(64),
          'No mail provider configured — the enquiry was NOT emailed.',
          `Would have sent to: ${message.to ?? getRecipient()}`,
          `Subject: ${message.subject}`,
          '',
          message.text,
          '─'.repeat(64),
        ].join('\n'),
      );
      return { ok: true, provider: 'none' };
    }

    return {
      ok: false,
      provider: 'none',
      error: 'No mail provider configured. Set RESEND_API_KEY or the SMTP_* variables.',
    };
  } catch (error) {
    return {
      ok: false,
      provider,
      error: error instanceof Error ? error.message : 'Unknown mail transport error',
    };
  }
}
