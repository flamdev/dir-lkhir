import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";
import { ModifierBesoinForm } from "@/components/besoins/ModifierBesoinForm";

// Mode de rendu : SSR — page protégée, propriétaire uniquement.
export const dynamic = "force-dynamic";

export default async function ModifierBesoinPage({ params }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/connexion");
  }

  await dbConnect();
  const besoin = await Besoin.findById(id).lean().catch(() => null);

  if (!besoin) {
    notFound();
  }

  // Vérification de propriété côté serveur : un non-propriétaire ne doit
  // jamais voir ce formulaire, même en accédant directement à l'URL.
  if (besoin.createdBy.toString() !== session.user.id) {
    redirect(`/besoins/${id}`);
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-night">
          Modifier le besoin
        </h1>
        <p className="mt-3 text-clay-500">
          Mettez à jour les informations de votre besoin.
        </p>
      </div>

      {/* JSON.parse(JSON.stringify()) est nécessaire ici (et préférable à
          structuredClone) : les ObjectId Mongoose ont un `.toJSON()`
          personnalisé qui les convertit en chaîne hexadécimale ; ce hook
          n'est appelé que par JSON.stringify, jamais par structuredClone. */}
      <ModifierBesoinForm besoin={JSON.parse(JSON.stringify(besoin))} />
    </section>
  );
}
