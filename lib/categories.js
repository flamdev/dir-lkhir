// lib/categories.js
//
// Utilitaire partagé : associe à chaque catégorie de besoin un style
// (palette bleu Majorelle & or) réutilisé par BesoinCard et les filtres.

export const CATEGORY_STYLES = {
  déménagement: {
    label: "Déménagement",
    badge: "bg-majorelle/10 text-majorelle-dark",
    dot: "bg-majorelle",
  },
  don: {
    label: "Don",
    badge: "bg-teal/10 text-teal-dark",
    dot: "bg-teal",
  },
  covoiturage: {
    label: "Covoiturage",
    badge: "bg-gold/15 text-gold-dark",
    dot: "bg-gold",
  },
  "soutien scolaire": {
    label: "Soutien scolaire",
    badge: "bg-plum/10 text-plum-dark",
    dot: "bg-plum",
  },
  autre: {
    label: "Autre",
    badge: "bg-clay-200/70 text-clay-700",
    dot: "bg-clay-500",
  },
};

export function getCategoryStyle(categorie) {
  return CATEGORY_STYLES[categorie] ?? CATEGORY_STYLES.autre;
}
