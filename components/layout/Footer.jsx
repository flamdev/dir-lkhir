import Link from "next/link";
import { ZelligeStar } from "@/components/illustrations/Ornaments";

export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="border-t border-clay-200/70 bg-sand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-majorelle to-gold text-sand-50 shadow-sm">
              <ZelligeStar className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold text-night">
              Dir <span className="text-majorelle">Khir</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-clay-500">
            La plateforme communautaire qui connecte les citoyens marocains
            autour de l&apos;entraide : déménagement, dons, covoiturage
            solidaire et soutien scolaire.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-night">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-clay-500">
            <li>
              <Link href="/" className="hover:text-majorelle-dark">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/besoins" className="hover:text-majorelle-dark">
                Tous les besoins
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-majorelle-dark">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-night">
            Compte
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-clay-500">
            <li>
              <Link href="/connexion" className="hover:text-majorelle-dark">
                Connexion
              </Link>
            </li>
            <li>
              <Link
                href="/inscription"
                className="hover:text-majorelle-dark"
              >
                Créer un compte
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-clay-200/70 py-6">
        <p className="text-center text-xs text-clay-500">
          © {annee} Dir Khir — Projet fil rouge, Formation Next.js Full-Stack.
        </p>
      </div>
    </footer>
  );
}
