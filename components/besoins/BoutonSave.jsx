"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toggleSave } from "@/actions/besoinActions";

function BoutonSubmit({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-clay-200 px-6 py-3 text-sm font-medium text-clay-700 transition hover:border-majorelle/40 hover:text-majorelle-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "..." : label}
    </button>
  );
}

/**
 * Bouton "Enregistrer / Retirer des favoris" (Client Component) : connecté
 * à la Server Action `toggleSave` via `useActionState`.
 */
export function BoutonSave({ besoinId, dejaEnregistre }) {
  const [state, formAction] = useActionState(toggleSave, {});
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={besoinId} />
      {state.error && <p className="mb-2 text-sm text-red-700">{state.error}</p>}
      <BoutonSubmit label={dejaEnregistre ? "Retirer des favoris" : "Enregistrer"} />
    </form>
  );
}
