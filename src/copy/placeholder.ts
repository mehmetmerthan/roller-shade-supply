/**
 * Gap-filling copy from docs/additional-content.md.
 * TODO(content): PLACEHOLDER until the client confirms it. Every item is tracked in
 * CONTENT_TODO.md §4. Never add statistics, certifications, or client names here.
 */
import { site } from '../config/site';

/** §2 Trust strip (derived from approved copy). No numeric stats until the client supplies real ones. */
export const trustStrip = [
  { label: 'Projects', value: 'Union and non-union' },
  { label: 'Sectors', value: 'Multifamily, commercial, education, public sector' },
  { label: 'Range', value: '3 product lines, 4 operating options' },
  { label: 'Company', value: 'Chicago-based and trade-focused' },
] as const;

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
 * §4 How it works. A real sequence, so the steps are numbered.
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
