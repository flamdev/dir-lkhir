// Mode de rendu : SSG — formulaire statique, aucune donnée dynamique
// côté serveur (la logique d'inscription s'exécute côté client via
// Better Auth).

import { InscriptionForm } from "@/components/auth/InscriptionForm";
import Link from "next/link";

export default function InscriptionPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-night">
          Créer un compte
        </h1>
        <p className="mt-3 text-clay-500">
          Rejoignez la communauté Dir Khir pour publier vos besoins et aider
          d&apos;autres citoyens.
        </p>
      </div>

      <InscriptionForm />

      <p className="mt-6 text-center text-sm text-clay-500">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-medium text-majorelle hover:underline">
          Connectez-vous
        </Link>
      </p>
    </section>
  );
}
