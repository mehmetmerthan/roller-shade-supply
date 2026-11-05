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
 * §4 How it works, shown as "What happens next" beside the quote form. A real
 * sequence, so the steps are numbered.
 * TODO(content): step 5 (installation and closeout) is omitted until the client says
 * whether they install, coordinate installers, or supply only. Steps 2–4 need confirmation.
 */
export const processSteps = [
  {
    title: 'Send your project details',
    text: 'Plans, a window schedule, or a simple list of sizes and quantities.',
  },
  {
    title: 'Receive your quote',
    text: `We review your request and reply by email, usually ${site.quoteResponseTime}.`,
  },
  {
    title: 'Approve submittals and samples',
    text: 'Product data, fabric samples, and specifications for your team or architect to sign off.',
  },
  {
    title: 'Production and delivery',
    text: 'Shades are made to size and delivered on your schedule, in phases if needed, labeled by unit or room.',
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
 * Quote form copy beyond the approved labels (src/copy/approved.ts → quoteFields):
 * the ✚ fields from docs/site-spec.md §7, group headings, hints, and the §10 errors.
 * TODO(content): all of it needs client confirmation (CONTENT_TODO.md §4).
 */
export const quoteFormCopy = {
  groups: {
    contact: 'About you',
    project: 'Your project',
    sizes: 'Sizes and plans',
    details: 'Project details',
  },
  phone: 'Phone',
  locationHint: 'City or ZIP code',
  quantityHint: 'Total number of shades or blinds, if you know it.',
  union: { legend: 'Union project?', options: ['Union', 'Non-union', 'Not sure'] },
  timeline: {
    label: 'Expected Timeline',
    hint: 'When you need delivery.',
    options: ['As soon as possible', 'Within 4 weeks', '4–8 weeks', '8+ weeks', 'Budgeting / pricing only'],
  },
  referral: {
    label: 'How did you hear about us?',
    options: ['Search engine', 'Referral from a colleague', 'Saw one of our projects', 'Returning customer', 'Other'],
  },
  sizes: {
    hint: 'Inches. Fractions like 35 3/8 are fine.',
    row: 'Size',
    label: 'Room or label',
    width: 'Width (in)',
    height: 'Height (in)',
    qty: 'Qty',
    add: 'Add another size',
    remove: 'Remove size',
    removed: 'removed',
    listLabel: 'Paste a list of sizes',
    listHint: 'One size per line, e.g. “Unit 2A living room, 50 × 50, qty 2”.',
  },
  uploadHint: `PDF, Excel, CSV, Word, JPG, or PNG, up to ${UPLOAD_MAX_LABEL}.`,
  roleHint: 'Choose the closest match.',
  checkboxHint: 'Select all that apply.',
  privacy: 'We use your details only to respond to your request.',
  privacyLink: 'Privacy Policy',
  sending: 'Sending your request…',
  callPrompt: 'Prefer to talk?',
  errors: {
    name: 'Please enter your name.',
    company: 'Please enter your company name.',
    email: 'Please enter your email address.',
    emailFormat: 'Please enter a valid email address, like name@company.com.',
    location: 'Please tell us where the project is located.',
    role: 'Please choose the option that best describes you.',
    details: 'Please tell us a little about your project.',
    fileSize: `This file is too large. Upload a file under ${UPLOAD_MAX_LABEL}, or email it to ${site.email.quotes}.`,
    fileType: `This file type can’t be uploaded. Use a PDF, Excel, CSV, Word, JPG, or PNG file, or email it to ${site.email.quotes}.`,
  },
} as const;

/** Quote page aside headings (new microcopy). */
export const quoteAside = {
  include: 'Please include',
  next: 'What happens next',
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
