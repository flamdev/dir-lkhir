"use client";

import { useMemo, useState } from "react";
import { BesoinCard } from "@/components/besoins/BesoinCard";
import { CATEGORIES } from "@/data/besoins";
import { getCategoryStyle } from "@/lib/categories";

const BESOINS_PAR_PAGE = 6;

/**
 * Composant client : gère le filtre par catégorie/statut, la recherche
 * par titre/ville et la pagination, côté navigateur (CSR). Le Server
 * Component parent (page ISR) récupère les besoins et les transmet en
 * props ; ce composant se charge uniquement de l'interactivité.
 */
export function BesoinListWithFilter({ besoins }) {
  const [filtre, setFiltre] = useState("tous");
  const [statut, setStatut] = useState("tous");
  const [recherche, setRecherche] = useState("");
  const [page, setPage] = useState(1);

  const besoinsFiltres = useMemo(() => {
    const termeRecherche = recherche.trim().toLowerCase();

    return besoins.filter((besoin) => {
      const correspondCategorie =
        filtre === "tous" || besoin.categorie === filtre;
      const correspondStatut =
        statut === "tous" || besoin.status === statut;
      const correspondRecherche =
        !termeRecherche ||
        besoin.titre.toLowerCase().includes(termeRecherche) ||
        besoin.ville.toLowerCase().includes(termeRecherche);

      return correspondCategorie && correspondStatut && correspondRecherche;
    });
  }, [besoins, filtre, statut, recherche]);

  const totalPages = Math.max(
    1,
    Math.ceil(besoinsFiltres.length / BESOINS_PAR_PAGE)
  );
  const pageActuelle = Math.min(page, totalPages);
  const besoinsPage = besoinsFiltres.slice(
    (pageActuelle - 1) * BESOINS_PAR_PAGE,
    pageActuelle * BESOINS_PAR_PAGE
  );

  function appliquerFiltre(setter, valeur) {
    setter(valeur);
    setPage(1); // revenir à la page 1 dès qu'un filtre change
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={recherche}
          onChange={(e) => appliquerFiltre(setRecherche, e.target.value)}
          placeholder="Rechercher par titre ou ville..."
          className="w-full rounded-full border border-clay-200 px-4 py-2.5 text-sm text-night outline-none transition focus:border-majorelle focus:ring-2 focus:ring-majorelle/20 sm:max-w-xs"
        />

        <div className="flex gap-2">
          {[
            { valeur: "tous", label: "Tous statuts" },
            { valeur: "ouvert", label: "Ouvert" },
            { valeur: "termine", label: "Terminé" },
          ].map((option) => (
            <button
              key={option.valeur}
              type="button"
              onClick={() => appliquerFiltre(setStatut, option.valeur)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                statut === option.valeur
                  ? "bg-teal text-white shadow-sm"
                  : "border border-clay-200/70 bg-white text-clay-700 hover:border-teal/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => appliquerFiltre(setFiltre, "tous")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filtre === "tous"
              ? "bg-majorelle text-white shadow-sm"
              : "border border-clay-200/70 bg-white text-clay-700 hover:border-majorelle/40"
          }`}
        >
          Tous
        </button>

        {CATEGORIES.map((categorie) => {
          const style = getCategoryStyle(categorie);
          const actif = filtre === categorie;
          return (
            <button
              key={categorie}
              type="button"
              onClick={() => appliquerFiltre(setFiltre, categorie)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                actif
                  ? "bg-majorelle text-white shadow-sm"
                  : "border border-clay-200/70 bg-white text-clay-700 hover:border-majorelle/40"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  actif ? "bg-white" : style.dot
                }`}
              />
              {style.label}
            </button>
          );
        })}
      </div>

      {besoinsFiltres.length === 0 ? (
        <p className="mt-10 text-center text-clay-500">
          Aucun besoin ne correspond à ces critères pour le moment.
        </p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {besoinsPage.map((besoin) => (
              <BesoinCard key={besoin._id} besoin={besoin} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pageActuelle === 1}
                className="rounded-full border border-clay-200/70 px-4 py-2 text-sm font-medium text-clay-700 transition hover:border-majorelle/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Précédent
              </button>

              <span className="text-sm text-clay-500">
                Page {pageActuelle} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={pageActuelle === totalPages}
                className="rounded-full border border-clay-200/70 px-4 py-2 text-sm font-medium text-clay-700 transition hover:border-majorelle/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
