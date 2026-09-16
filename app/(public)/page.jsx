import Link from "next/link";
import { BesoinCard } from "@/components/besoins/BesoinCard";
import { MoroccanArch } from "@/components/illustrations/MoroccanArch";
import { ArcadeDivider } from "@/components/illustrations/Ornaments";

// Mode de rendu : SSR — page d'accueil publique, toujours à jour
// immédiatement après création/modification/suppression d'un besoin (le
// cache navigateur des pages statiques/ISR a un minimum incompressible
// de 30s chez Next.js, ce qui provoquait un affichage périmé).
export const dynamic = "force-dynamic";

// Récupère les 6 derniers besoins depuis MongoDB via le Route Handler
// GET /api/besoins/recents. `cache: "no-store"` garantit des données
// toujours fraîches.
async function getRecentBesoins() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/besoins/recents`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

const CONCEPT_STEPS = [
  {
    titre: "Exprimez un besoin",
    description:
      "Déménagement, don de matériel, soutien scolaire, covoiturage... publiez votre besoin en quelques clics.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    ),
  },
  {
    titre: "Trouvez de l'aide",
    description:
      "D'autres citoyens de votre ville proposent leur participation et vous accompagnent concrètement.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M13.5 3.7a4 4 0 0 1 0 7.6M21 20v-1a4 4 0 0 0-3-3.9M10 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      />
    ),
  },
  {
    titre: "Suivez l'avancement",
    description:
      "Gérez vos besoins créés, vos participations et vos favoris depuis votre profil.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
  },
];

export default async function HomePage() {
  const derniersBesoins = await getRecentBesoins();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-majorelle/10 px-4 py-1.5 text-sm font-medium text-majorelle-dark">
              Entraide citoyenne au Maroc
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-night sm:text-5xl">
              Dir <span className="text-majorelle">Khir</span>, faites du
              bien autour de vous
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-clay-700">
              Exprimez un besoin d&apos;aide ou proposez votre participation
              à celui d&apos;un voisin : déménagement, don de matériel,
              soutien scolaire, covoiturage solidaire...
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/besoins"
                className="rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-md shadow-majorelle/20 transition hover:bg-majorelle-dark"
              >
                Découvrir les besoins
              </Link>
              <Link
                href="/inscription"
                className="rounded-full border border-clay-200 px-6 py-3 text-sm font-medium text-clay-700 transition hover:border-teal/50 hover:text-teal-dark"
              >
                Rejoindre la communauté
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-majorelle/20 via-gold/20 to-teal/20 blur-3xl" />
            <MoroccanArch className="w-full drop-shadow-xl" />

            {/* Badges statistiques flottants (glassmorphism) */}
            <div className="absolute -left-6 top-8 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
              <p className="font-display text-2xl font-bold text-majorelle">+120</p>
              <p className="text-xs text-clay-700">Besoins publiés</p>
            </div>
            <div className="absolute -right-6 top-1/2 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
              <p className="font-display text-2xl font-bold text-teal-dark">+300</p>
              <p className="text-xs text-clay-700">Participations</p>
            </div>
            <div className="absolute -left-4 bottom-6 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
              <p className="font-display text-2xl font-bold text-gold-dark">8</p>
              <p className="text-xs text-clay-700">Villes actives</p>
            </div>
          </div>
        </div>

        <ArcadeDivider className="h-8 w-full text-sand-100" />
      </section>

      {/* Présentation du concept */}
      <section className="bg-sand-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-night">
              Comment ça marche ?
            </h2>
            <p className="mt-3 text-clay-500">
              Trois étapes simples pour donner et recevoir de l&apos;aide
              autour de vous.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CONCEPT_STEPS.map((step, index) => (
              <div
                key={step.titre}
                className="relative overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-majorelle to-gold text-white shadow-sm">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    {step.icon}
                  </svg>
                </div>
                <span className="mt-4 block font-display text-xs font-bold uppercase tracking-wider text-gold-dark">
                  Étape {index + 1}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-night">
                  {step.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-clay-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 derniers besoins */}
      <section className="bg-sand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-night">
                Derniers besoins publiés
              </h2>
              <p className="mt-2 text-clay-500">
                Découvrez les demandes les plus récentes de la communauté.
              </p>
            </div>
            <Link
              href="/besoins"
              className="text-sm font-medium text-teal-dark hover:underline"
            >
              Voir tous les besoins →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {derniersBesoins.map((besoin) => (
              <BesoinCard key={besoin._id} besoin={besoin} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative overflow-hidden bg-gradient-to-br from-majorelle to-majorelle-dark">
        <div className="relative mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white">
            Prêt à Dir Khir autour de vous ?
          </h2>
          <p className="mt-3 text-sand-100">
            Créez votre compte et publiez votre premier besoin en quelques
            minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-majorelle-dark shadow-sm transition hover:bg-sand-100"
            >
              Créer un compte gratuitement
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
