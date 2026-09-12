/**
 * Email bodies for contact-form enquiries.
 *
 * Everything user-supplied is escaped before it reaches the HTML template.
 * Layout uses tables and inline styles because email clients are not browsers.
 */

import { site } from './site';
import type { ContactFormValues } from './validation';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function paragraphs(message: string): string {
  return message
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 12px;">${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

type Row = { label: string; value: string; href?: string };

function buildRows(values: ContactFormValues): Row[] {
  const rows: Row[] = [
    { label: 'Name', value: values.name },
    { label: 'Email', value: values.email, href: `mailto:${values.email}` },
  ];

  if (values.phone) rows.push({ label: 'Phone', value: values.phone, href: `tel:${values.phone.replace(/[^\d+]/g, '')}` });
  if (values.company) rows.push({ label: 'Company', value: values.company });
  if (values.service) rows.push({ label: 'Service of interest', value: values.service });
  if (values.budget) rows.push({ label: 'Indicative budget', value: values.budget });

  return rows;
}

/* ----- Notification to the agency ---------------------------------------- */

export function buildNotificationSubject(values: ContactFormValues): string {
  const who = values.company || values.name;
  return `New website enquiry — ${who}`;
}

export function buildNotificationText(values: ContactFormValues, receivedAt: Date): string {
  const lines = buildRows(values).map((row) => `${row.label}: ${row.value}`);

  return [
    `New enquiry from the ${site.name} website`,
    `Received: ${receivedAt.toUTCString()}`,
    '',
    ...lines,
    '',
    'Message:',
    values.message,
    '',
    `Reply directly to this email to reach ${values.name}.`,
  ].join('\n');
}

export function buildNotificationHtml(values: ContactFormValues, receivedAt: Date): string {
  const rows = buildRows(values)
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #E7E9F3;font:600 13px/1.4 Arial,Helvetica,sans-serif;color:#68708C;width:180px;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #E7E9F3;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:#111A5E;">${
            row.href
              ? `<a href="${escapeHtml(row.href)}" style="color:#145DFF;text-decoration:none;">${escapeHtml(row.value)}</a>`
              : escapeHtml(row.value)
          }</td>
        </tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New website enquiry</title></head>
<body style="margin:0;padding:24px 12px;background:#F3F5FA;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#FFFFFF;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px -24px rgba(16,24,95,0.35);">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#10185F,#080F42);">
        <p style="margin:0 0 6px;font:700 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#C79BFF;">${escapeHtml(site.name)}</p>
        <h1 style="margin:0;font:700 23px/1.25 Arial,Helvetica,sans-serif;color:#FFFFFF;">New website enquiry</h1>
        <p style="margin:8px 0 0;font:400 13px/1.5 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.72);">${escapeHtml(receivedAt.toUTCString())}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 32px;">
        <p style="margin:0 0 10px;font:600 13px/1.4 Arial,Helvetica,sans-serif;color:#68708C;">Message</p>
        <div style="padding:18px;border-radius:14px;background:#F6F5FF;border:1px solid #E7E4F8;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#111A5E;">${paragraphs(values.message)}</div>
        <p style="margin:22px 0 0;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:#68708C;">Reply to this email to respond directly to ${escapeHtml(values.name)}.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ----- Acknowledgement to the enquirer ------------------------------------ */

export function buildAutoReplySubject(): string {
  return `Thanks for getting in touch — ${site.name}`;
}

export function buildAutoReplyText(values: ContactFormValues): string {
  return [
    `Hi ${values.name},`,
    '',
    `Thanks for contacting ${site.name}. Your enquiry has landed with us and one of the founders will reply personally within one working day.`,
    '',
    'For reference, here is what you sent:',
    '',
    values.message,
    '',
    `If anything is urgent, call us on ${site.contact.phone}.`,
    '',
    `— ${site.name}`,
    site.contact.location,
  ].join('\n');
}

export function buildAutoReplyHtml(values: ContactFormValues): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thanks for getting in touch</title></head>
<body style="margin:0;padding:24px 12px;background:#F3F5FA;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:18px;overflow:hidden;">
    <tr>
      <td style="padding:30px 32px;background:linear-gradient(135deg,#10185F,#080F42);">
        <h1 style="margin:0;font:700 22px/1.3 Arial,Helvetica,sans-serif;color:#FFFFFF;">Thanks for getting in touch</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 32px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:#111A5E;">
        <p style="margin:0 0 14px;">Hi ${escapeHtml(values.name)},</p>
        <p style="margin:0 0 14px;">Thanks for contacting ${escapeHtml(site.name)}. Your enquiry has reached us and one of the founders will reply personally within one working day.</p>
        <p style="margin:0 0 10px;font:600 13px/1.4 Arial,Helvetica,sans-serif;color:#68708C;">What you sent us</p>
        <div style="padding:16px;border-radius:14px;background:#F6F5FF;border:1px solid #E7E4F8;">${paragraphs(values.message)}</div>
        <p style="margin:18px 0 0;">If anything is urgent, call us on <a href="${site.contact.phoneHref}" style="color:#145DFF;text-decoration:none;">${escapeHtml(site.contact.phone)}</a>.</p>
        <p style="margin:22px 0 0;color:#68708C;font-size:14px;">— ${escapeHtml(site.name)}, ${escapeHtml(site.contact.location)}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
