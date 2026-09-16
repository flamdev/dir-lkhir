"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteBesoin } from "@/actions/besoinActions";

function BoutonConfirmerSuppression() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-200 px-6 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Suppression..." : "Supprimer"}
    </button>
  );
}

function confirmerSuppression(event) {
  if (!confirm("Supprimer ce besoin définitivement ?")) {
    event.preventDefault();
  }
}

/**
 * Bouton "Supprimer" (propriétaire uniquement) avec confirmation côté
 * client avant l'envoi du formulaire.
 */
export function DeleteButton({ besoinId }) {
  const [state, formAction] = useActionState(deleteBesoin, {});

  return (
    <form action={formAction} onSubmit={confirmerSuppression}>
      <input type="hidden" name="id" value={besoinId} />
      {state.error && <p className="mb-2 text-sm text-red-700">{state.error}</p>}
      <BoutonConfirmerSuppression />
    </form>
  );
}
