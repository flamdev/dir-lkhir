"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { markAsDone } from "@/actions/besoinActions";

function BoutonSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-teal px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "..." : "Marquer comme fait"}
    </button>
  );
}

/**
 * Bouton "Marquer comme fait" (propriétaire uniquement).
 */
export function MarkAsDoneButton({ besoinId }) {
  const [state, formAction] = useActionState(markAsDone, {});
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
      <BoutonSubmit />
    </form>
  );
}
