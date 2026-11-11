// Íconos de línea (trazo 1.5) — estilo Lucide, licencia ISC.
const P = (d) => d.map((x) => (x.startsWith('<') ? x : `<path d="${x}"/>`)).join('');

export const icons = {
  languages: P(['m5 8 6 6', 'm4 14 6-6 2-3', 'M2 5h12', 'M7 2h1', 'm22 22-5-10-5 10', 'M14 18h6']),
  van: P(['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', '<circle cx="7" cy="17" r="2"/>', 'M9 17h6', '<circle cx="17" cy="17" r="2"/>']),
  glass: P(['M8 22h8', 'M7 10h10', 'M12 15v7', 'M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z']),
  route: P(['<circle cx="6" cy="19" r="3"/>', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15', '<circle cx="18" cy="5" r="3"/>']),
  chat: P(['M7.9 20A9 9 0 1 0 4 16.1L2 22Z', 'M9 10h.01', 'M12 10h.01', 'M15 10h.01']),
  arrow: P(['M5 12h14', 'm12 5 7 7-7 7']),
  left: P(['m15 18-6-6 6-6']),
  right: P(['m9 18 6-6-6-6']),
  down: P(['m6 9 6 6 6-6']),
  x: P(['M18 6 6 18', 'm6 6 12 12']),
  menu: P(['M4 7h16', 'M4 12h16', 'M4 17h16']),
  clock: P(['<circle cx="12" cy="12" r="9"/>', 'M12 7v5l3 2']),
  pin: P(['M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0', '<circle cx="12" cy="10" r="3"/>']),
  check: P(['M20 6 9 17l-5-5']),
  minus: P(['M6 12h12']),
  plus: P(['M12 5v14', 'M5 12h14']),
  instagram: P(['<rect x="2.5" y="2.5" width="19" height="19" rx="5"/>', 'M16 11.4A4 4 0 1 1 12.6 8a4 4 0 0 1 3.4 3.4z', 'M17.5 6.5h.01']),
  mail: P(['<rect x="2" y="4" width="20" height="16" rx="2"/>', 'm22 7-9 5.7a2 2 0 0 1-2 0L2 7']),
  baby: P(['M9 12h.01', 'M15 12h.01', 'M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5', 'M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1']),
  expand: P(['M15 3h6v6', 'M9 21H3v-6', 'M21 3l-7 7', 'M3 21l7-7']),
  users: P(['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', '<circle cx="9" cy="7" r="4"/>', 'M22 21v-2a4 4 0 0 0-3-3.9', 'M16 3.1a4 4 0 0 1 0 7.8']),
  external: P(['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6']),
  shield: P(['M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z']),
  card: P(['<rect x="2" y="5" width="20" height="14" rx="2"/>', 'M2 10h20']),
};

export const sprite = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${Object.entries(icons)
    .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`)
    .join('')}<symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.4l-5.9 3.2 1.2-6.6L2.5 9.4l6.6-.9z"/></symbol></svg>`;

export const ic = (name, cls = 'ic') => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
