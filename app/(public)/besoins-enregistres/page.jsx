import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";
import { BesoinCard } from "@/components/besoins/BesoinCard";

// Mode de rendu : SSR — liste personnalisée, propre à l'utilisateur
// connecté.
export const dynamic = "force-dynamic";

export default async function BesoinsEnregistresPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/connexion");
  }

  await dbConnect();
  const besoins = await Besoin.find({ savedBy: session.user.id })
    .populate("createdBy", "name")
    .sort({ createdAt: -1 })
    .lean();

  const besoinsSerialises = JSON.parse(JSON.stringify(besoins));

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-medium text-gold-dark">
          Mes favoris
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-night">
          Besoins enregistrés
        </h1>
        <p className="mt-2 text-clay-500">
          Retrouvez ici les besoins que vous avez mis de côté pour plus
          tard.
        </p>
      </div>

      {besoinsSerialises.length === 0 ? (
        <p className="mt-10 text-center text-clay-500">
          Vous n&apos;avez encore enregistré aucun besoin.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {besoinsSerialises.map((besoin) => (
            <BesoinCard key={besoin._id} besoin={besoin} />
          ))}
        </div>
      )}
    </section>
  );
}
