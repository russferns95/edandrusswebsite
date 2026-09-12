'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

import { AlertIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { budgetOptions, serviceOptions } from '@/lib/content';
import { site } from '@/lib/site';
import {
  emptyContactForm,
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactFormValues,
} from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Order used when deciding which invalid field to focus first. */
const FIELD_ORDER: ContactField[] = ['name', 'email', 'phone', 'company', 'service', 'budget', 'message'];

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({ ...emptyContactForm });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  /** Validation only starts nagging after the first submit attempt. */
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef(0);

  /* Timestamp the render so the API can spot superhumanly fast submissions. */
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  /* Send focus to the confirmation so screen readers land on the outcome. */
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const field = name as ContactField;

    setValues((current) => {
      const next = { ...current, [field]: value };
      // Re-validate live once the user has already seen the errors.
      if (submitted) setErrors(validateContact(next));
      return next;
    });
  };

  const focusFirstError = (found: ContactErrors) => {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validateContact(values);
    setErrors(found);

    if (hasErrors(found)) {
      setStatus('error');
      setStatusMessage('Please check the highlighted fields and try again.');
      focusFirstError(found);
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          // Honeypot: a real person never sees this field.
          website: (formRef.current?.elements.namedItem('website') as HTMLInputElement)?.value ?? '',
          startedAt: startedAtRef.current,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: ContactErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        setStatus('error');
        setStatusMessage(
          data.message ?? 'Something went wrong sending your message. Please try again in a moment.',
        );
        return;
      }

      setStatus('success');
      setValues({ ...emptyContactForm });
      setErrors({});
      setSubmitted(false);
    } catch {
      setStatus('error');
      setStatusMessage('We could not reach the server. Please check your connection, or email us directly.');
    }
  };

  const describedBy = (field: ContactField) => (errors[field] ? `${field}-error` : undefined);

  if (status === 'success') {
    return (
      <div className="form-card">
        <div className="form-success" ref={successRef} tabIndex={-1} role="status">
          <span className="form-success-icon" aria-hidden="true">
            <CheckCircleIcon />
          </span>
          <h3>Message sent</h3>
          <p>
            Thanks for getting in touch. Your enquiry is with the team and one of the founders will reply
            within one working day.
          </p>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h3>Tell us about your business</h3>
      <p className="form-intro">
        Fill this in and we will come back with an honest view of what we would do first.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name')}
              required
            />
            {errors.name ? (
              <span className="field-error" id="name-error">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@company.com"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              required
            />
            {errors.email ? (
              <span className="field-error" id="email-error">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="company">
              Company <span className="field-optional">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              value={values.company}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="phone">
              Phone <span className="field-optional">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7000 000000"
              value={values.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy('phone')}
            />
            {errors.phone ? (
              <span className="field-error" id="phone-error">
                {errors.phone}
              </span>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="service">What can we help with?</label>
            <select id="service" name="service" value={values.service} onChange={handleChange}>
              <option value="">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="budget">
              Budget <span className="field-optional">(optional)</span>
            </label>
            <select id="budget" name="budget" value={values.budget} onChange={handleChange}>
              <option value="">Select a range</option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="field field-full">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your business, the goal you are working towards, and anything you have already tried."
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy('message')}
              required
            />
            {errors.message ? (
              <span className="field-error" id="message-error">
                {errors.message}
              </span>
            ) : null}
          </div>

          {/* Honeypot — hidden from people, irresistible to bots. */}
          <div className="field-honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
        </div>

        <div className="form-footer">
          <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              'Send enquiry'
            )}
          </button>
          <p className="form-note">
            We only use your details to reply to this enquiry. No lists, no sharing.
          </p>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {status === 'error' && statusMessage ? (
            <div className="form-status form-status-error">
              <AlertIcon />
              <span>
                {statusMessage} You can always email us at{' '}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
              </span>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
