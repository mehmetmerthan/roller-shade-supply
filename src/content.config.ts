import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  INDUSTRIES,
  LABOR,
  OPERATING_SYSTEMS,
  PRODUCTS,
  PROJECT_TYPES,
  SECTORS,
} from './config/taxonomy';

/** CSS object-position keywords or percentages, e.g. "50% 35%" or "center top". */
const OBJECT_POSITION =
  /^(?:\d{1,3}%|left|center|right|top|bottom)(?:\s+(?:\d{1,3}%|left|center|right|top|bottom))?$/;

/**
 * Projects: one Markdown file per folder in src/assets/projects/.
 * Files prefixed with "_" are held-back projects (no page, never listed) and are
 * not loaded. Rename `_slug.md` to `slug.md` to publish one. See CLAUDE.md.
 * Keep this schema in sync with the "Project frontmatter schema" in CLAUDE.md.
 */
const projects = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    /** Folder name, displayed exactly as written (CLAUDE.md rule 1). */
    title: z.string().min(1),
    /** Exact folder name in src/assets/projects/. */
    folder: z.string().min(1),
    sector: z.enum(SECTORS),
    industries: z.array(z.enum(INDUSTRIES)).min(1),
    location: z.string().min(1),
    year: z.number().int().min(1990).max(2100),
    clientType: z.string().min(1),
    projectType: z.enum(PROJECT_TYPES),
    labor: z.enum(LABOR),
    products: z.array(z.enum(PRODUCTS)).min(1),
    fabrics: z.array(z.string().min(1)),
    operatingSystems: z.array(z.enum(OPERATING_SYSTEMS)).min(1),
    scope: z.string().min(1),
    quantity: z.number().int().positive().optional(),
    timeline: z.string().min(1),
    /** Used as the meta description. */
    summary: z.string().min(1).max(160),
    highlights: z.array(z.string().min(1)).length(3),
    featured: z.boolean(),
    order: z.number().int(),
    placeholder: z.boolean(),
    /** Filename override for the cover image. */
    cover: z.string().optional(),
    photos: z
      .array(
        z.object({
          file: z.string().min(1),
          alt: z.string().min(1),
          /** CSS object-position used when the photo is cropped, e.g. "50% 35%". */
          position: z.string().regex(OBJECT_POSITION).optional(),
        }),
      )
      .optional(),
    /** YouTube or Vimeo URL. */
    video: z.url().optional(),
  }),
});

export const collections = { projects };
