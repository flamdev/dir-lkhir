/**
 * Convention Next.js `loading.jsx` : interface affichée automatiquement
 * par l'App Router pendant le chargement du Server Component de ce
 * segment.
 *
 * Squelette de chargement (skeleton) qui reprend la structure exacte de
 * la carte détail pour éviter tout saut de mise en page (CLS).
 */
export default function LoadingBesoinDetail() {
  return (
    <section className="mx-auto max-w-3xl animate-pulse px-4 py-12 sm:px-6">
      <div className="h-4 w-32 rounded-full bg-clay-200/70" />

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm sm:p-8">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal opacity-40"
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="h-6 w-28 rounded-full bg-clay-200/70" />
          <div className="h-6 w-16 rounded-full bg-clay-200/70" />
        </div>

        <div className="mt-4 h-8 w-3/4 rounded-lg bg-clay-200/70" />

        <div className="mt-3 flex flex-wrap gap-4">
          <div className="h-4 w-24 rounded-full bg-clay-200/70" />
          <div className="h-4 w-40 rounded-full bg-clay-200/70" />
        </div>

        <div className="mt-6 space-y-2">
          <div className="h-3 w-full rounded-full bg-clay-200/70" />
          <div className="h-3 w-full rounded-full bg-clay-200/70" />
          <div className="h-3 w-2/3 rounded-full bg-clay-200/70" />
        </div>

        <div className="mt-8 h-4 w-32 rounded-full border-t border-clay-200/70 bg-clay-200/70 pt-6" />

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="h-11 w-32 rounded-full bg-clay-200/70" />
          <div className="h-11 w-32 rounded-full bg-clay-200/70" />
        </div>
      </div>
    </section>
  );
}
