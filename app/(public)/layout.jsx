import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout du groupe (public) : Navbar + Footer partagés par toutes les
 * pages accessibles sans connexion (accueil, besoins, contact...).
 * Le nom du groupe "(public)" n'apparaît jamais dans l'URL.
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
