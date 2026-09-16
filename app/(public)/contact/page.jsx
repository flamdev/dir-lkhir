// Mode de rendu : SSG — aucune donnée dynamique, formulaire statique.
// Le traitement du formulaire passe par la Server Action
// `sendContactMessage`, appelée depuis le Client Component ContactForm.

import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-medium text-gold-dark">
          Nous sommes à votre écoute
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-night">
          Contactez-nous
        </h1>
        <p className="mt-3 text-clay-500">
          Une question, une suggestion ? Remplissez le formulaire ci-dessous,
          nous vous répondrons rapidement.
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
