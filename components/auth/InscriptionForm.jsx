"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Formulaire d'inscription (Client Component) : appelle directement
// Better Auth depuis le navigateur via authClient.signUp.email().
export function InscriptionForm() {
  const router = useRouter();
  const [erreur, setErreur] = useState(null);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErreur(null);
    setChargement(true);

    const formData = new FormData(event.currentTarget);

    const { error } = await authClient.signUp.email({
      name: formData.get("nom"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    setChargement(false);

    if (error) {
      setErreur(error.message ?? "Impossible de créer le compte.");
      return;
    }

    // Redirige vers la page profil (Server Component protégé par la
    // session Better Auth).
    router.push("/profil");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-8 space-y-5 overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal"
      />

      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-clay-700">
          Nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          minLength={2}
          placeholder="Votre nom"
          className="mt-2 w-full rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-clay-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="vous@exemple.com"
          className="mt-2 w-full rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-clay-700">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="8 caractères minimum"
          className="mt-2 w-full rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
        />
      </div>

      {erreur && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={chargement}
        className="w-full rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {chargement ? "Création en cours..." : "Créer mon compte"}
      </button>
    </form>
  );
}
