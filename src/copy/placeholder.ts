/**
 * Gap-filling copy from docs/additional-content.md.
 * TODO(content): PLACEHOLDER until the client confirms it. Every item is tracked in
 * CONTENT_TODO.md §4. Never add statistics, certifications, or client names here.
 */
import { site } from '../config/site';
import { UPLOAD_MAX_LABEL } from '../lib/forms';

/**
 * §3 Why work with us. #1, #4, #5 restate approved copy.
 * TODO(content): #2 (consistent product), #3 (labeling), #6 (turnaround) need confirmation.
 */
export const valueProps = [
  {
    title: 'Built for the trade',
    text: 'We work with builders, contractors, developers, and property managers. Our quoting and communication are set up for project work, not retail shopping.',
  },
  {
    title: 'Consistent product, unit after unit',
    text: 'The same fabric, color, and hardware across every unit and floor, so the building looks finished from the street.',
  },
  {
    title: 'Coordination you can schedule around',
    text: 'We plan deliveries around your construction schedule and label everything so the right shade reaches the right window.',
  },
  {
    title: 'Ready for public-sector work',
    text: 'We understand the coordination, documentation, scheduling, and site requirements of schools and government facilities.',
  },
  {
    title: 'Union and non-union',
    text: 'We support both, so we can serve a wide range of public and private-sector clients.',
  },
  {
    title: 'Fast, accurate quotes',
    text: 'Send sizes, quantities, and your timeline, or upload a window schedule, and we’ll get back to you quickly.',
  },
] as const;

/**
 * The approved [FAST-QUOTE] example request, read back against the checklist.
 * Labels are the approved checklist items; values restate the example (no new facts).
 */
export const exampleBreakdown = [
  { label: 'Product type', value: 'Roller shades' },
  { label: 'Width and height', value: '50" W × 50" H (approximate)' },
  { label: 'Quantity', value: '20' },
  { label: 'Operating system', value: 'Cordless' },
  { label: 'Project location', value: 'Chicago (multifamily)' },
  { label: 'Expected timeline', value: 'Delivery within six weeks' },
] as const;

/**
 * Quote form copy beyond the approved labels (src/copy/approved.ts → quoteFields).
 * The form is Name, Email (both required), Phone, message, and upload (11/11/2026).
 * TODO(content): needs client confirmation (CONTENT_TODO.md §4).
 */
export const quoteFormCopy = {
  phone: 'Phone',
  uploadHint: `PDF, Excel, CSV, Word, JPG, or PNG, up to ${UPLOAD_MAX_LABEL}.`,
  privacy: 'We use your details only to respond to your request.',
  privacyLink: 'Privacy Policy',
  sending: 'Sending your request…',
  callPrompt: 'Prefer to talk?',
  errors: {
    name: 'Please enter your name.',
    email: 'Please enter your email address.',
    emailFormat: 'Please enter a valid email address, like name@company.com.',
    fileSize: `This file is too large. Upload a file under ${UPLOAD_MAX_LABEL}, or email it to ${site.email.quotes}.`,
    fileType: `This file type can’t be uploaded. Use a PDF, Excel, CSV, Word, JPG, or PNG file, or email it to ${site.email.quotes}.`,
  },
} as const;

/** Quote page aside headings (new microcopy). */
export const quoteAside = {
  include: 'Please include',
  contact: 'Talk to our team',
} as const;

/** §10 Thank-you page (/request-a-quote/thank-you/). */
export const thankYou = {
  title: 'Thanks, we’ve received your request.',
  body: `Our team will review your project details and reply by email ${site.quoteResponseTime}.`,
  urgent: 'If your timeline is urgent, call us at',
  projectsCta: 'View Our Projects',
  homeCta: 'Back to Home',
} as const;

/** §10 404 page. */
export const notFound = {
  title: 'This page isn’t here.',
  body: 'It may have moved or been removed. Try one of these instead:',
} as const;
