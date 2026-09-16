import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";
import { ProfilTabs } from "@/components/profil/ProfilTabs";

// Mode de rendu : SSR — page personnalisée, protégée par la session de
// l'utilisateur connecté.
export const dynamic = "force-dynamic";

// Les documents Mongoose (ObjectId, Date...) ne sont pas sérialisables
// tels quels pour être transmis à un Client Component : on les convertit
// en objets JSON simples (string pour _id/createdAt).
// JSON.parse(JSON.stringify()) est nécessaire ici (et préférable à
// structuredClone) : les ObjectId Mongoose ont un `.toJSON()` personnalisé
// qui les convertit en chaîne hexadécimale ; ce hook n'est appelé que par
// JSON.stringify, jamais par structuredClone (qui les transformerait en
// objets vides -> bug "[object Object]" dans les liens/formulaires).
function serialiser(besoins) {
  return JSON.parse(JSON.stringify(besoins));
}

export default async function ProfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/connexion");
  }

  await dbConnect();

  const [besoinsCrees, participations] = await Promise.all([
    Besoin.find({ createdBy: session.user.id })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .lean(),
    Besoin.find({ participants: session.user.id })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  const nbParticipations = participations.length;
  // Bonus (cahier des charges) : nombre total de personnes ayant
  // participé aux besoins que j'ai créés.
  const nbPersonnesAidees = besoinsCrees.reduce(
    (total, besoin) => total + (besoin.participants?.length ?? 0),
    0
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm sm:p-8">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal"
        />
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-night">
              {session.user.name}
            </h1>
            <p className="mt-1 text-clay-500">{session.user.email}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-majorelle-dark">
                {besoinsCrees.length}
              </p>
              <p className="text-xs text-clay-500">Besoins créés</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-teal-dark">
                {nbParticipations}
              </p>
              <p className="text-xs text-clay-500">Participations</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-gold-dark">
                {nbPersonnesAidees}
              </p>
              <p className="text-xs text-clay-500">Personnes aidées</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/besoins/creer"
            className="inline-block rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark"
          >
            + Publier un besoin
          </Link>
          <Link
            href="/besoins-enregistres"
            className="inline-block rounded-full border border-clay-200 px-6 py-3 text-sm font-medium text-clay-700 transition hover:border-majorelle/40 hover:text-majorelle-dark"
          >
            Mes besoins enregistrés
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <ProfilTabs
          besoinsCrees={serialiser(besoinsCrees)}
          participations={serialiser(participations)}
        />
      </div>
    </section>
  );
}
