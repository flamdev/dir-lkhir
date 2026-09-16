import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCategoryStyle } from "@/lib/categories";
import { BoutonParticipation } from "@/components/besoins/BoutonParticipation";
import { BoutonSave } from "@/components/besoins/BoutonSave";
import { DeleteButton } from "@/components/besoins/DeleteButton";
import { MarkAsDoneButton } from "@/components/besoins/MarkAsDoneButton";

// Mode de rendu : SSR — page publique consultée/partagée individuellement,
// dont les données (nb de participants, statut) doivent rester fraîches à
// chaque visite. `force-dynamic` désactive tout cache statique sur ce
// segment : le HTML est régénéré à chaque requête.
export const dynamic = "force-dynamic";

// Récupère un besoin depuis MongoDB via le Route Handler
// GET /api/besoins/[id]. `cache: "no-store"` garantit des données
// toujours fraîches (SSR).
async function getBesoin(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/besoins/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function BesoinDetailPage({ params }) {
  const { id } = await params;

  const [session, besoin] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getBesoin(id),
  ]);

  // Convention Next.js : notFound() interrompt le rendu et affiche le
  // fichier not-found.jsx le plus proche (ici celui du segment [id]).
  if (!besoin) {
    notFound();
  }

  const style = getCategoryStyle(besoin.categorie);
  const nbParticipants = besoin.participants?.length ?? 0;
  const estTermine = besoin.status === "termine";

  const estProprietaire =
    !!session && besoin.createdBy?._id?.toString() === session.user.id;
  const dejaParticipant =
    !!session &&
    besoin.participants?.some(
      (p) => (p._id ?? p).toString() === session.user.id
    );
  const dejaEnregistre =
    !!session &&
    besoin.savedBy?.some((s) => s.toString() === session.user.id);

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/besoins"
        className="inline-flex items-center gap-1 text-sm font-medium text-teal-dark hover:underline"
      >
        ← Retour à la liste
      </Link>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm sm:p-8">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal"
        />
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            {style.label}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              estTermine
                ? "bg-clay-200/70 text-clay-700"
                : "bg-teal/10 text-teal-dark"
            }`}
          >
            {estTermine ? "Terminé" : "Ouvert"}
          </span>
          {besoin.urgent && !estTermine && (
            <span className="animate-pulse rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Urgent
            </span>
          )}
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold text-night">
          {besoin.titre}
        </h1>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-clay-500">
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
          <span>
            Publié par{" "}
            <span className="font-medium text-clay-700">
              {besoin.createdBy?.name ?? "Anonyme"}
            </span>
          </span>
        </div>

        <p className="mt-6 leading-relaxed text-clay-700">
          {besoin.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-clay-200/70 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-dark">
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

        {/* Actions réservées au propriétaire du besoin. Le HTML de ces
            boutons n'est même pas envoyé au navigateur si l'utilisateur
            n'est pas propriétaire : la vérification est faite côté
            serveur. */}
        <ActionsBesoin
          id={id}
          estProprietaire={estProprietaire}
          estTermine={estTermine}
          session={session}
          dejaParticipant={dejaParticipant}
          dejaEnregistre={dejaEnregistre}
        />
      </div>
    </section>
  );
}

function ActionsBesoin({
  id,
  estProprietaire,
  estTermine,
  session,
  dejaParticipant,
  dejaEnregistre,
}) {
  if (estProprietaire) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/besoins/${id}/modifier`}
          className="rounded-full border border-clay-200 px-6 py-3 text-sm font-medium text-clay-700 transition hover:border-majorelle/40 hover:text-majorelle-dark"
        >
          Modifier
        </Link>
        {!estTermine && <MarkAsDoneButton besoinId={id} />}
        <DeleteButton besoinId={id} />
      </div>
    );
  }

  if (session) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        <BoutonParticipation besoinId={id} dejaParticipant={dejaParticipant} />
        <BoutonSave besoinId={id} dejaEnregistre={dejaEnregistre} />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href="/connexion"
        className="rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark"
      >
        Se connecter pour participer
      </Link>
    </div>
  );
}
