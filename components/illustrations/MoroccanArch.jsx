/**
 * Illustration décorative : une porte marocaine (arc outrepassé) surmontée
 * d'une unique étoile à 8 branches (khatam). Purement visuel — aucune
 * donnée dynamique.
 */
export function MoroccanArch({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 460"
      fill="none"
      className={className}
      role="img"
      aria-label="Illustration d'une porte marocaine ornée d'une étoile de zellige"
    >
      <defs>
        <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-majorelle)" />
          <stop offset="100%" stopColor="var(--color-majorelle-dark)" />
        </linearGradient>
        <linearGradient id="archInner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-teal)" />
          <stop offset="100%" stopColor="var(--color-teal-dark)" />
        </linearGradient>
        <clipPath id="archClip">
          <path d="M200 14C122 14 74 64 74 146V446H326V146C326 64 278 14 200 14Z" />
        </clipPath>
      </defs>

      {/* Cadre extérieur (bandeau majorelle) */}
      <path
        d="M200 6C116 6 62 60 62 146V454H338V146C338 60 284 6 200 6Z"
        fill="url(#archFill)"
      />

      {/* Panneau intérieur (teal) */}
      <g clipPath="url(#archClip)">
        <rect x="60" y="10" width="280" height="450" fill="url(#archInner)" />

        {/* Bandeau bas façon porte à claire-voie */}
        <rect x="60" y="360" width="280" height="14" fill="var(--color-gold)" opacity="0.85" />
        <rect x="60" y="392" width="280" height="8" fill="var(--color-sand-100)" opacity="0.6" />

        {/* Étoile centrale à 8 branches (khatam) */}
        <g transform="translate(200,190)">
          <path
            d="M0 -78 L18 -32 L64 -55 L37 -14 L82 0 L37 14 L64 55 L18 32 L0 78 L-18 32 L-64 55 L-37 14 L-82 0 L-37 -14 L-64 -55 L-18 -32Z"
            fill="var(--color-sand-50)"
            opacity="0.95"
          />
          <path
            d="M0 -78 L18 -32 L64 -55 L37 -14 L82 0 L37 14 L64 55 L18 32 L0 78 L-18 32 L-64 55 L-37 14 L-82 0 L-37 -14 L-64 -55 L-18 -32Z"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="3"
          />
          <circle r="26" fill="var(--color-majorelle)" />
          <circle r="26" fill="none" stroke="var(--color-sand-50)" strokeWidth="2" />
        </g>
      </g>

      {/* Bandes concentriques (moulures de la porte) */}
      <path
        d="M200 14C122 14 74 64 74 146V446H326V146C326 64 278 14 200 14Z"
        fill="none"
        stroke="var(--color-sand-50)"
        strokeOpacity="0.7"
        strokeWidth="4"
      />
      <path
        d="M200 30C132 30 90 74 90 148V446H310V148C310 74 268 30 200 30Z"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="3"
      />
    </svg>
  );
}
