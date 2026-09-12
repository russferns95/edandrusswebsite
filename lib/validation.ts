/**
 * Contact-form validation shared by the browser and the API route.
 *
 * The client uses it for instant feedback; the route re-runs it because
 * anything arriving over the network is untrusted.
 */

export type ContactField = 'name' | 'email' | 'company' | 'phone' | 'service' | 'budget' | 'message';

export type ContactFormValues = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContactForm: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
};

export const LIMITS = {
  name: 80,
  email: 160,
  company: 120,
  phone: 40,
  service: 80,
  budget: 60,
  message: 4000,
} as const;

/** Deliberately permissive: it rejects obvious typos, not unusual addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** Digits, spaces and the usual separators. Only checked when a phone is given. */
const PHONE_PATTERN = /^[+()\d][\d\s\-().]{5,}$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Strips control characters that let a value smuggle extra email headers. */
function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

export function normaliseContactInput(input: unknown): ContactFormValues {
  const raw = (input ?? {}) as Record<string, unknown>;

  return {
    name: stripControlChars(asString(raw.name)).slice(0, LIMITS.name),
    email: stripControlChars(asString(raw.email)).slice(0, LIMITS.email).toLowerCase(),
    company: stripControlChars(asString(raw.company)).slice(0, LIMITS.company),
    phone: stripControlChars(asString(raw.phone)).slice(0, LIMITS.phone),
    service: stripControlChars(asString(raw.service)).slice(0, LIMITS.service),
    budget: stripControlChars(asString(raw.budget)).slice(0, LIMITS.budget),
    // Message keeps its line breaks; only the truly dangerous chars go.
    message: asString(raw.message).replace(/\r\n/g, '\n').slice(0, LIMITS.message),
  };
}

export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name) {
    errors.name = 'Please tell us your name.';
  } else if (values.name.length < 2) {
    errors.name = 'That name looks a little short.';
  }

  if (!values.email) {
    errors.email = 'We need an email address to reply to.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please check that email address.';
  }

  if (values.phone && !PHONE_PATTERN.test(values.phone)) {
    errors.phone = 'Please check that phone number.';
  }

  if (!values.message) {
    errors.message = 'Let us know what you are looking for.';
  } else if (values.message.trim().length < 15) {
    errors.message = 'A little more detail helps us reply properly.';
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
