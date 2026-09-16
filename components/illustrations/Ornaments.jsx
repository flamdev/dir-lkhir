/**
 * Petite étoile à 8 branches (motif zellige) réutilisée comme puce
 * décorative ou pictogramme dans plusieurs sections.
 */
export function ZelligeStar({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 2 24 14 36 12 27 20 36 28 24 26 20 38 16 26 4 28 13 20 4 12 16 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Séparateur de section en forme d'arcade marocaine répétée, utilisé
 * entre deux blocs pour rappeler l'architecture des riads.
 */
export function ArcadeDivider({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 40V20C0 9 9 0 20 0C31 0 40 9 40 20V40M40 40V20C40 9 49 0 60 0C71 0 80 9 80 20V40M80 40V20C80 9 89 0 100 0C111 0 120 9 120 20V40M120 40V20C120 9 129 0 140 0C151 0 160 9 160 20V40M160 40V20C160 9 169 0 180 0C191 0 200 9 200 20V40M200 40V20C200 9 209 0 220 0C231 0 240 9 240 20V40M240 40V20C240 9 249 0 260 0C271 0 280 9 280 20V40M280 40V20C280 9 289 0 300 0C311 0 320 9 320 20V40M320 40V20C320 9 329 0 340 0C351 0 360 9 360 20V40M360 40V20C360 9 369 0 380 0C391 0 400 9 400 20V40"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
