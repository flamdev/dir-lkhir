import Link from "next/link";

/**
 * Convention Next.js `not-found.jsx` : interface affichée automatiquement
 * lorsque `notFound()` est appelé dans `page.jsx` de ce segment, ou
 * lorsque l'utilisateur visite un `/besoins/[id]` inexistant.
 */
export default function BesoinNotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <span className="inline-flex items-center gap-2 rounded-full bg-clay-200/70 px-4 py-1.5 text-sm font-medium text-clay-700">
        Erreur 404
      </span>
      <h1 className="mt-4 font-display text-2xl font-bold text-night">
        Besoin introuvable
      </h1>
      <p className="mt-3 text-clay-500">
        Ce besoin n&apos;existe pas, a été supprimé, ou le lien est
        incorrect.
      </p>
      <Link
        href="/besoins"
        className="mt-6 inline-block rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white transition hover:bg-majorelle-dark"
      >
        Retour à la liste des besoins
      </Link>
    </section>
  );
}
