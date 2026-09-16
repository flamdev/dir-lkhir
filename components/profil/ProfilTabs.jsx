"use client";

import { useState } from "react";
import { BesoinCard } from "@/components/besoins/BesoinCard";

const TABS = [
  { id: "crees", label: "Mes besoins créés" },
  { id: "participations", label: "Mes participations" },
];

/**
 * Composant client : gère l'onglet actif côté navigateur (CSR).
 * Le Server Component parent (/profil, SSR) récupère les deux listes de
 * besoins liées à la session et les transmet en props ; ce composant se
 * charge uniquement de l'interactivité (bascule entre onglets).
 */
export function ProfilTabs({ besoinsCrees, participations }) {
  const [onglet, setOnglet] = useState("crees");

  const besoins = onglet === "crees" ? besoinsCrees : participations;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-clay-200/70">
        {TABS.map((tab) => {
          const actif = onglet === tab.id;
          const compteur =
            tab.id === "crees" ? besoinsCrees.length : participations.length;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setOnglet(tab.id)}
              className={`relative px-4 py-3 text-sm font-medium transition ${
                actif
                  ? "text-majorelle-dark"
                  : "text-clay-500 hover:text-clay-700"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                  actif
                    ? "bg-majorelle/10 text-majorelle-dark"
                    : "bg-clay-200/70 text-clay-700"
                }`}
              >
                {compteur}
              </span>
              {actif && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-majorelle" />
              )}
            </button>
          );
        })}
      </div>

      {besoins.length === 0 ? (
        <p className="mt-10 text-center text-clay-500">
          {onglet === "crees"
            ? "Vous n'avez encore publié aucun besoin."
            : "Vous ne participez encore à aucun besoin."}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {besoins.map((besoin) => (
            <BesoinCard key={besoin._id} besoin={besoin} />
          ))}
        </div>
      )}
    </div>
  );
}
