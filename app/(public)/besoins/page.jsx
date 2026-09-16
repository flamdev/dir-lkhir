import Link from "next/link";
import { BesoinListWithFilter } from "@/components/besoins/BesoinListWithFilter";

// Mode de rendu : SSR — liste publique, toujours à jour immédiatement
// après création/modification/suppression/participation (le cache
// navigateur des pages statiques/ISR a un minimum incompressible de 30s
// chez Next.js, ce qui provoquait un affichage périmé après une action).
export const dynamic = "force-dynamic";

// Récupère tous les besoins depuis MongoDB via le Route Handler
// GET /api/besoins. `cache: "no-store"` garantit des données toujours
// fraîches.
async function getBesoins() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/besoins`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function BesoinsPage() {
  const besoins = await getBesoins();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-sm font-medium text-teal-dark">
            Communauté Dir Khir
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-night">
            Tous les besoins
          </h1>
          <p className="mt-2 text-clay-500">
            Parcourez les demandes d&apos;aide publiées par la communauté et
            filtrez par catégorie.
          </p>
        </div>

        <Link
          href="/besoins/creer"
          className="rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark"
        >
          + Publier un besoin
        </Link>
      </div>

      <div className="mt-8">
        {/* Le filtre par catégorie est un Client Component (CSR) : */}
        {/* la liste des besoins provient du Server Component (ISR). */}
        <BesoinListWithFilter besoins={besoins} />
      </div>
    </section>
  );
}
