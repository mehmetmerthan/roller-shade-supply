/**
 * Project data helpers: sorted entries, auto-discovered galleries, covers, alt text.
 * Galleries come from src/assets/projects/<Folder>/ (CLAUDE.md "Project photos — rules" 4).
 */
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { productLabels } from '../config/taxonomy';

export type Project = CollectionEntry<'projects'>;

export interface ProjectPhoto {
  file: string;
  src: ImageMetadata;
  alt: string;
  /** CSS object-position for crops. */
  position: string;
  origin?: 'web' | 'video-still';
}

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const naturalSort = (a: string, b: string) => a.localeCompare(b, 'en', { numeric: true });

/** Folder name → image files (natural sort). */
const imagesByFolder = new Map<string, { file: string; src: ImageMetadata }[]>();
for (const [path, mod] of Object.entries(modules)) {
  const parts = path.split('/');
  const file = parts.at(-1)!;
  const folder = parts.at(-2)!;
  const list = imagesByFolder.get(folder) ?? [];
  list.push({ file, src: mod.default });
  imagesByFolder.set(folder, list);
}
for (const list of imagesByFolder.values()) list.sort((a, b) => naturalSort(a.file, b.file));

/** All live projects, sorted by `order`. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

/** Fallback alt (CLAUDE.md rule 6): "{Products} at {Project Title}, {Location}". */
export function fallbackAlt(project: Project): string {
  const products = project.data.products.map((p) => productLabels[p]).join(' and ');
  return `${products} at ${project.data.title}, ${project.data.location}`;
}

/** Every photo of a project, in gallery order, with alt text and crop position. */
export function getPhotos(project: Project): ProjectPhoto[] {
  const images = imagesByFolder.get(project.data.folder) ?? [];
  const meta = new Map((project.data.photos ?? []).map((p) => [p.file, p]));
  return images.map(({ file, src }) => {
    const m = meta.get(file);
    return {
      file,
      src,
      alt: m?.alt ?? fallbackAlt(project),
      position: m?.position ?? '50% 50%',
      origin: m?.origin,
    };
  });
}

/** Cover: frontmatter `cover`, else `cover.*`, else the first image. */
export function getCover(project: Project): ProjectPhoto {
  const photos = getPhotos(project);
  if (photos.length === 0) throw new Error(`Project "${project.data.title}" has no photos.`);
  const byName = project.data.cover && photos.find((p) => p.file === project.data.cover);
  return byName || photos.find((p) => /^cover\./i.test(p.file)) || photos[0];
}

export const projectHref = (project: Project) => `/projects/${project.id}/`;
