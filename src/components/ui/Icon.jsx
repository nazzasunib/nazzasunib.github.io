const P = {
  /* --- generic / ui --- */
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowUp: 'M12 19V5M5 12l7-7 7 7',
  arrowUpRight: 'M7 17L17 7M17 7H8M17 7v9',
  chevLeft: 'M15 18l-6-6 6-6',
  chevRight: 'M9 18l6-6-6-6',
  download: 'M12 3v12m0 0l-4-4m4 4l4-4M4 21h16',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  mail: 'M2 6l10 7 10-7M2 6h20v12H2z',
  phone:
    'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.2 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  pin: 'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z',
  link: 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3',
  star: 'M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6z',
  award: 'M12 15a4 4 0 100-8 4 4 0 000 8zM8.21 13.89L7 23l5-3 5 3-1.21-9.12',
  code: 'M8 3L2 12l6 9M16 3l6 9-6 9',
  close: 'M18 6L6 18M6 6l12 12',

  /* --- business --- */
  trend: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  bars: 'M18 20V10M12 20V4M6 20v-6',
  compass: 'M12 3a9 9 0 100 18 9 9 0 000-18zM16 8l-2.2 6L8 16l2.2-6z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  check: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',

  /* --- textile --- */
  weave:
    'M4 4c2 2 4 2 6 0s4-2 6 0 4 2 4 0M4 12c2 2 4 2 6 0s4-2 6 0 4 2 4 0M4 20c2 2 4 2 6 0s4-2 6 0 4 2 4 0',
  spool: 'M12 9a3 3 0 100-6 3 3 0 000 6zM12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4',
  drop: 'M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z',
  shirt: 'M3 20h18M5 20v-4a2 2 0 012-2h6l4-4h4M9 14V8a2 2 0 012-2h2',
  pulse: 'M22 12h-4l-3 9L9 3l-3 9H2',
  cap: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5',
  needle: 'M3 21L19 5M18 3l3 3',
  roll: 'M5 5v10M19 5v10M5 5c0-1.4 3.1-2.5 7-2.5S19 3.6 19 5s-3.1 2.5-7 2.5S5 6.4 5 5zM5 15c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5',
  grid: 'M4 8h16M4 16h16M8 4v16M16 4v16',
  cotton: 'M8 8a3 3 0 100-6 3 3 0 000 6zM16 8a3 3 0 100-6 3 3 0 000 6zM12 17a3 3 0 100-6 3 3 0 000 6zM12 17v4',
  db: 'M12 8c5 0 9-1.3 9-3s-4-3-9-3-9 1.3-9 3 4 3 9 3zM3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3',
  laptop: 'M3 4h18v12H3zM2 20h20M8 20l1-4h6l1 4',
  chip: 'M8 8h8v8H8zM4 9V7a3 3 0 013-3h2M20 9V7a3 3 0 00-3-3h-2M4 15v2a3 3 0 003 3h2M20 15v2a3 3 0 01-3 3h-2',

  /* --- misc --- */
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9S9.5 5.7 12 3z',
  cloud: 'M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z',
  cart: 'M3 4h2l2.4 11.2a2 2 0 002 1.6h8.8a2 2 0 001.9-1.4L21 8H6M9 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
};

/* filled brand marks kept separate — they need fill, not stroke */
const FILLED = {
  github:
    'M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.4 4.9 18.4 5.2 18.4 5.2c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z',
  facebook:
    'M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z',
  youtube:
    'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6z',
};

export default function Icon({ name, size = 22, stroke = 1.7, className, style }) {
  if (FILLED[name]) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <path d={FILLED[name]} />
      </svg>
    );
  }
  if (name === 'instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  const d = P[name] || P.spark;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export const ICON_PATHS = P;
