"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateBesoin } from "@/actions/besoinActions";
import { CATEGORIES } from "@/data/besoins";
import { getCategoryStyle } from "@/lib/categories";

const initialState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Modification en cours..." : "Enregistrer les modifications"}
    </button>
  );
}

/**
 * Formulaire de modification d'un besoin (propriétaire uniquement),
 * pré-rempli avec les données existantes. Connecté à la Server Action
 * `updateBesoin` via `useActionState`.
 */
export function ModifierBesoinForm({ besoin }) {
  const [state, formAction] = useActionState(updateBesoin, initialState);

  return (
    <form
      action={formAction}
      className="relative mt-8 space-y-5 overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal"
      />
      <input type="hidden" name="id" value={besoin._id} />

      <div>
        <label htmlFor="titre" className="block text-sm font-medium text-clay-700">
          Titre
        </label>
        <input
          id="titre"
          name="titre"
          type="text"
          required
          minLength={3}
          maxLength={100}
          defaultValue={besoin.titre}
          className="mt-2 w-full rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-clay-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          minLength={10}
          defaultValue={besoin.description}
          className="mt-2 w-full resize-none rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="categorie" className="block text-sm font-medium text-clay-700">
            Catégorie
          </label>
          <select
            id="categorie"
            name="categorie"
            required
            defaultValue={besoin.categorie}
            className="mt-2 w-full rounded-xl border border-clay-200 bg-white px-4 py-2.5 text-sm capitalize text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
          >
            {CATEGORIES.map((categorie) => (
              <option key={categorie} value={categorie} className="capitalize">
                {getCategoryStyle(categorie).label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ville" className="block text-sm font-medium text-clay-700">
            Ville
          </label>
          <input
            id="ville"
            name="ville"
            type="text"
            required
            defaultValue={besoin.ville}
            className="mt-2 w-full rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-clay-700">
        <input
          type="checkbox"
          name="urgent"
          defaultChecked={besoin.urgent}
          className="h-4 w-4 rounded border-clay-200 text-majorelle focus:ring-majorelle/20"
        />
        <span>Marquer ce besoin comme urgent</span>
      </label>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
