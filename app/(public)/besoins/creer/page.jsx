import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { CreerBesoinForm } from "@/components/besoins/CreerBesoinForm";

// Mode de rendu : SSR — page protégée, accès à la session utilisateur.
export const dynamic = "force-dynamic";

export default async function CreerBesoinPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/connexion");
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-night">
          Exprimer un besoin
        </h1>
        <p className="mt-3 text-clay-500">
          Décrivez votre besoin, la communauté Dir Khir se mobilisera pour
          vous aider.
        </p>
      </div>

      <CreerBesoinForm />
    </section>
  );
}
