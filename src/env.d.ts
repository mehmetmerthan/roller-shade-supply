/// <reference types="astro/client" />

// Fontsource packages are CSS-only side-effect imports with no type declarations.
// TypeScript 6 checks side-effect imports, so declare them here.
declare module '@fontsource-variable/*';
