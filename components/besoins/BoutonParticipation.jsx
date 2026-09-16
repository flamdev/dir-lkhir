"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toggleParticipation } from "@/actions/besoinActions";

function BoutonSubmit({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "..." : label}
    </button>
  );
}

/**
 * Bouton "Participer / Se retirer" (Client Component) : connecté à la
 * Server Action `toggleParticipation` via `useActionState`.
 */
export function BoutonParticipation({ besoinId, dejaParticipant }) {
  const [state, formAction] = useActionState(toggleParticipation, {});
  const router = useRouter();

  // Force un rafraîchissement complet (données + cache navigateur) après
  // chaque succès, pour éviter d'afficher un état périmé.
  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={besoinId} />
      {state.error && <p className="mb-2 text-sm text-red-700">{state.error}</p>}
      <BoutonSubmit label={dejaParticipant ? "Se retirer" : "Participer"} />
    </form>
  );
}
