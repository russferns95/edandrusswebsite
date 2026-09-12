import { NextResponse } from 'next/server';

import {
  buildAutoReplyHtml,
  buildAutoReplySubject,
  buildAutoReplyText,
  buildNotificationHtml,
  buildNotificationSubject,
  buildNotificationText,
} from '@/lib/email-templates';
import { getMailProvider, getRecipient, sendMail } from '@/lib/mail';
import { checkRateLimit, getClientKey } from '@/lib/rate-limit';
import { hasErrors, normaliseContactInput, validateContact } from '@/lib/validation';

// nodemailer needs the Node runtime; the Resend path would run on edge too.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Bots fill hidden fields and submit faster than a person can type. */
const MIN_FILL_MS = 2500;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Malformed request body.' }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  // --- Spam traps -------------------------------------------------------
  // Answer 200 so a bot cannot tell it was caught.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(payload.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  // --- Rate limit -------------------------------------------------------
  const limit = checkRateLimit(getClientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: 'That is a few messages in a short space of time. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  // --- Validate ---------------------------------------------------------
  const values = normaliseContactInput(payload);
  const errors = validateContact(values);

  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors },
      { status: 422 },
    );
  }

  // --- Send -------------------------------------------------------------
  const receivedAt = new Date();

  const notification = await sendMail({
    to: getRecipient(),
    replyTo: values.email,
    subject: buildNotificationSubject(values),
    text: buildNotificationText(values, receivedAt),
    html: buildNotificationHtml(values, receivedAt),
  });

  if (!notification.ok) {
    console.error('[contact] Failed to send enquiry:', notification.error);
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not send your message just now. Please email us directly and we will pick it up straight away.',
      },
      { status: 502 },
    );
  }

  // --- Optional acknowledgement to the enquirer -------------------------
  if (process.env.CONTACT_AUTOREPLY === 'true' && getMailProvider() !== 'none') {
    const acknowledgement = await sendMail({
      to: values.email,
      subject: buildAutoReplySubject(),
      text: buildAutoReplyText(values),
      html: buildAutoReplyHtml(values),
    });

    // A failed acknowledgement must not fail the enquiry itself.
    if (!acknowledgement.ok) {
      console.error('[contact] Auto-reply failed:', acknowledgement.error);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, message: 'Method not allowed.' }, { status: 405 });
}
