"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZelligeStar } from "@/components/illustrations/Ornaments";
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/besoins", label: "Besoins" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const router = useRouter();
  // Session lue côté client : le composant doit rester "use client" pour
  // pouvoir utiliser ce hook.
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    setOuvert(false);
    router.push("/");
    // Force les Server Components (pages ISR/SSR) à relire la session.
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-clay-200/70 bg-sand-50/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-majorelle to-gold text-sand-50 shadow-sm">
            <ZelligeStar className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold text-night">
            Dir <span className="text-majorelle">Khir</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-clay-700 transition hover:bg-majorelle/10 hover:text-majorelle-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            // Évite un flash "Connexion" pendant la vérification de session.
            <div className="h-9 w-24 animate-pulse rounded-full bg-clay-200/70" />
          ) : session ? (
            <>
              <span className="px-2 text-sm font-medium text-clay-700">
                Bonjour, {session.user.name}
              </span>
              <Link
                href="/profil"
                className="rounded-full bg-majorelle px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark"
              >
                Profil
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-clay-200 px-4 py-2 text-sm font-medium text-clay-700 transition hover:border-majorelle/40 hover:text-majorelle-dark"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="rounded-full px-4 py-2 text-sm font-medium text-teal-dark transition hover:bg-teal/10"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="rounded-full bg-majorelle px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-majorelle-dark"
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-label="Ouvrir le menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-clay-700 hover:bg-majorelle/10 md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {ouvert ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {ouvert && (
        <div className="border-t border-clay-200/70 bg-sand-50 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOuvert(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-clay-700 hover:bg-majorelle/10"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-clay-200/70" />
            {session ? (
              <>
                <span className="px-3 py-2 text-sm font-medium text-clay-700">
                  Bonjour, {session.user.name}
                </span>
                <Link
                  href="/profil"
                  onClick={() => setOuvert(false)}
                  className="rounded-lg bg-majorelle px-3 py-2 text-center text-sm font-medium text-white"
                >
                  Profil
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-majorelle hover:bg-majorelle/10"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  onClick={() => setOuvert(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-teal-dark hover:bg-teal/10"
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  onClick={() => setOuvert(false)}
                  className="rounded-lg bg-majorelle px-3 py-2 text-center text-sm font-medium text-white"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
