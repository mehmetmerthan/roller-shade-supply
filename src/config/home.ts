/**
 * Home-page photo choices (CLAUDE.md "Project photos — rules" 4).
 * The hero must be a client photo of at least 2560 px on the long edge: never a
 * web-sourced image (`origin: web`), a video still, or a low-res file.
 * The hero photo is also the default Open Graph image until the branded card exists.
 */
export const homePhotos = {
  /** Project whose cover fills the hero pane (SRIS 033ef675: 2560 × 1920 client photo). */
  heroProject: 'sris-international-school',
  /** Portrait photo beside "Who We Are": lowered shades with daylight at the edges. */
  about: { project: '914-w-hubbard-st', file: 'img-7119.jpg' },
} as const;
