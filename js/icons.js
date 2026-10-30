/** Inline SVG icons (stroke-based, currentColor). */

const svg = (paths, extra = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" ${extra}>${paths}</svg>`;

export const icons = {
  sun: svg(
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  ),
  moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
  menu: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
  github: svg(
    '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.1-.4 6.4-1.6 6.4-7A5.4 5.4 0 0 0 20 4.8a5 5 0 0 0-.1-3.7s-1.1-.4-3.7 1.4a12.7 12.7 0 0 0-6.7 0C6.9.7 5.8 1.1 5.8 1.1A5 5 0 0 0 5.7 4.8 5.4 5.4 0 0 0 4.3 8.5c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-1 2.6V22"/>',
  ),
  mail: svg(
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  ),
  linkedin: svg(
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A6 6 0 0 1 16 8Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  ),
  file: svg(
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/>',
  ),
  verified: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-label="Verified"><path d="m12 1.5 2.6 2 3.2-.3 1 3.1 2.7 1.8-1 3.1 1 3.1-2.7 1.8-1 3.1-3.2-.3-2.6 2-2.6-2-3.2.3-1-3.1L2.5 14.3l1-3.1-1-3.1L5.2 6.3l1-3.1 3.2.3Z"/><path fill="var(--background)" d="m10.6 15.4-3-3 1.3-1.3 1.7 1.7 4.5-4.5 1.3 1.3Z"/></svg>`,
};
