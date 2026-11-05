/**
 * Form backend adapter (CLAUDE.md: keep the backend swappable; docs/site-spec.md §7).
 *
 * Default backend: Netlify Forms. Netlify finds the form in the built HTML at deploy
 * time (data-netlify), stores each submission, emails the recipients set in the
 * Netlify UI, and then serves `action` (the thank-you page). Only fields present in
 * the static HTML are stored, so fields built in the browser must write into a
 * hidden input that is already in the markup (see the quote form's measurements).
 *
 * To switch backends (e.g., a serverless function + email API on another host),
 * change `formAttributes()` and `hiddenFields()` here; the form markup and its
 * client-side validation stay the same.
 *
 * Netlify Forms doesn't process submissions in `astro dev`: there the form script
 * skips the POST and goes straight to the thank-you page (`devStub`).
 */

export const FORM_BACKEND = 'netlify' as const;

/** Spam honeypot: a hidden field people never fill in (Netlify drops submissions that do). */
export const HONEYPOT_FIELD = 'bot-field';

/**
 * Upload limit. Netlify caps the whole request at 8 MB, so one file stays under 7 MB.
 * TODO(content): larger plans go by email (CONTENT_TODO.md §6).
 */
export const UPLOAD_MAX_BYTES = 7 * 1024 * 1024;
export const UPLOAD_MAX_LABEL = '7 MB';
export const UPLOAD_ACCEPT = '.pdf,.xls,.xlsx,.csv,.doc,.docx,.jpg,.jpeg,.png';

export interface FormConfig {
  /** Form name as the backend knows it (Netlify: the form's `name`). */
  name: string;
  /** Page shown after a successful submission. */
  successPath: string;
  /** Needed when the form has a file input. */
  multipart?: boolean;
}

export const quoteForm: FormConfig = {
  name: 'quote',
  successPath: '/request-a-quote/thank-you/',
  multipart: true,
};

/** Attributes for the <form> element. */
export function formAttributes(form: FormConfig) {
  return {
    name: form.name,
    method: 'post',
    action: form.successPath,
    enctype: form.multipart ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
    'data-netlify': 'true',
    'netlify-honeypot': HONEYPOT_FIELD,
  } as const;
}

/** Hidden inputs the backend needs. Netlify injects form-name itself; sending it too is harmless. */
export function hiddenFields(form: FormConfig): { name: string; value: string }[] {
  return [{ name: 'form-name', value: form.name }];
}

/** True in `astro dev`, where no backend receives the POST. */
export const devStub = import.meta.env.DEV;
