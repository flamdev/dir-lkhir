import Link from "next/link";
import { getCategoryStyle } from "@/lib/categories";

/**
 * Carte réutilisable affichant le résumé d'un besoin.
 * Utilisée sur la page d'accueil et la page /besoins.
 */
export function BesoinCard({ besoin }) {
  const style = getCategoryStyle(besoin.categorie);
  const nbParticipants = besoin.participants?.length ?? 0;
  const estTermine = besoin.status === "termine";

  return (
    <Link
      href={`/besoins/${besoin._id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-majorelle/40 hover:shadow-lg"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal opacity-0 transition group-hover:opacity-100"
      />
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {style.label}
        </span>

        <div className="flex items-center gap-2">
          {besoin.urgent && !estTermine && (
            <span className="animate-pulse rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Urgent
            </span>
          )}
          {estTermine && (
            <span className="rounded-full bg-clay-200/70 px-3 py-1 text-xs font-medium text-clay-700">
              Terminé
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 line-clamp-2 font-display text-lg font-semibold text-night group-hover:text-majorelle-dark">
        {besoin.titre}
      </h3>

      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-clay-500">
        {besoin.description}
      </p>

      <p className="mt-3 text-xs text-clay-500">
        Publié par{" "}
        <span className="font-medium text-clay-700">
          {besoin.createdBy?.name ?? "Anonyme"}
        </span>
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-clay-200/70 pt-4 text-sm text-clay-500">
        <span className="inline-flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21c-4.5-4.2-7.5-7.7-7.5-11.2A7.5 7.5 0 0 1 12 2.3a7.5 7.5 0 0 1 7.5 7.5c0 3.5-3 7-7.5 11.2Z"
            />
            <circle cx="12" cy="9.8" r="2.5" />
          </svg>
          {besoin.ville}
        </span>

        <span className="inline-flex items-center gap-1.5 font-medium text-teal-dark">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M13.5 3.7a4 4 0 0 1 0 7.6M21 20v-1a4 4 0 0 0-3-3.9M10 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            />
          </svg>
          {nbParticipants} participant{nbParticipants > 1 ? "s" : ""}
        </span>
      </div>
    </Link>
  );
}
