"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage } from "@/actions/contactActions";

const initialState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-majorelle px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Envoi en cours..." : "Envoyer le message"}
    </button>
  );
}

/**
 * Formulaire de contact (Client Component) : connecté à la Server Action
 * `sendContactMessage` via `useActionState`.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  if (state.success) {
    return (
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-8 text-center shadow-sm">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-majorelle via-gold to-teal"
        />
        <p className="font-display text-lg font-semibold text-night">
          Votre message a été envoyé. Merci !
        </p>
        <p className="mt-2 text-sm text-clay-500">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative mt-10 space-y-5 overflow-hidden rounded-2xl border border-clay-200/70 bg-white p-6 shadow-sm sm:p-8"
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
        <label htmlFor="message" className="block text-sm font-medium text-clay-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          placeholder="Votre message..."
          className="mt-2 w-full resize-none rounded-xl border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
