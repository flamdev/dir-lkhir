// Mode de rendu : SSG — formulaire statique, aucune donnée dynamique
// côté serveur (la logique de connexion s'exécute côté client via
// Better Auth).

import { ConnexionForm } from "@/components/auth/ConnexionForm";
import Link from "next/link";

export default function ConnexionPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-night">
          Se connecter
        </h1>
        <p className="mt-3 text-clay-500">
          Retrouvez vos besoins publiés et vos participations.
        </p>
      </div>

      <ConnexionForm />

      <p className="mt-6 text-center text-sm text-clay-500">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-medium text-majorelle hover:underline">
          Inscrivez-vous
        </Link>
      </p>
    </section>
  );
}
