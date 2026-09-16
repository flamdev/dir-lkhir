// data/besoins.js
//
// Données de départ ("seed") insérées dans MongoDB Atlas par
// `scripts/seed.mjs`. Ce fichier ne sert plus à alimenter les pages
// directement : les pages lisent désormais les vraies données via les
// Route Handlers (`app/api/besoins/**`) et MongoDB.

export const CATEGORIES = [
  "déménagement",
  "don",
  "covoiturage",
  "soutien scolaire",
  "autre",
];

export const besoins = [
  {
    _id: "1",
    titre: "Aide pour déménagement le week-end",
    description:
      "Je déménage samedi matin dans le même quartier et j'ai besoin de bras pour porter des cartons et un canapé. Un camion est déjà réservé.",
    categorie: "déménagement",
    ville: "Casablanca",
    createdBy: { nom: "Amine T." },
    participants: ["u1", "u2"],
    savedBy: [],
    status: "ouvert",
    createdAt: "2026-09-12T09:30:00.000Z",
  },
  {
    _id: "2",
    titre: "Don de vêtements d'hiver pour enfants",
    description:
      "Nous avons plusieurs sacs de vêtements d'hiver (2 à 8 ans) en très bon état à donner à une famille dans le besoin.",
    categorie: "don",
    ville: "Rabat",
    createdBy: { nom: "Salma B." },
    participants: ["u3"],
    savedBy: ["u4"],
    status: "ouvert",
    createdAt: "2026-09-13T14:00:00.000Z",
  },
  {
    _id: "3",
    titre: "Covoiturage Casablanca → Marrakech vendredi",
    description:
      "Je pars vendredi vers 18h en voiture pour Marrakech, il reste 3 places disponibles. Participation aux frais d'essence bienvenue.",
    categorie: "covoiturage",
    ville: "Marrakech",
    createdBy: { nom: "Youssef K." },
    participants: ["u5", "u6", "u7"],
    savedBy: [],
    status: "ouvert",
    createdAt: "2026-09-11T08:15:00.000Z",
  },
  {
    _id: "4",
    titre: "Soutien scolaire en mathématiques niveau collège",
    description:
      "Ma fille est en 3ème année collège et a besoin d'un accompagnement en mathématiques deux fois par semaine avant les examens.",
    categorie: "soutien scolaire",
    ville: "Fès",
    createdBy: { nom: "Nadia E." },
    participants: [],
    savedBy: ["u2"],
    status: "ouvert",
    createdAt: "2026-09-10T11:45:00.000Z",
  },
  {
    _id: "5",
    titre: "Don de matériel scolaire pour la rentrée",
    description:
      "Cartables, cahiers et fournitures neuves ou peu utilisées à donner pour des enfants qui en ont besoin pour la rentrée.",
    categorie: "don",
    ville: "Tanger",
    createdBy: { nom: "Karim L." },
    participants: ["u8"],
    savedBy: [],
    status: "ouvert",
    createdAt: "2026-09-09T16:20:00.000Z",
  },
  {
    _id: "6",
    titre: "Aide pour transporter des meubles",
    description:
      "J'ai récupéré une armoire et une table qu'il faut transporter sur environ 5 km. Un véhicule utilitaire serait idéal.",
    categorie: "déménagement",
    ville: "Agadir",
    createdBy: { nom: "Hafid R." },
    participants: ["u9"],
    savedBy: [],
    status: "termine",
    createdAt: "2026-09-08T10:00:00.000Z",
  },
  {
    _id: "7",
    titre: "Covoiturage quotidien Salé → Rabat",
    description:
      "Je cherche des collègues pour partager les trajets domicile-travail entre Salé et Rabat du lundi au vendredi.",
    categorie: "covoiturage",
    ville: "Salé",
    createdBy: { nom: "Imane S." },
    participants: ["u10", "u11"],
    savedBy: ["u1"],
    status: "ouvert",
    createdAt: "2026-09-07T07:30:00.000Z",
  },
  {
    _id: "8",
    titre: "Besoin d'aide pour un déménagement de bureau",
    description:
      "Notre petite association change de local. Nous avons besoin d'aide pour déplacer des cartons et du mobilier de bureau.",
    categorie: "autre",
    ville: "Oujda",
    createdBy: { nom: "Association Al Amal" },
    participants: [],
    savedBy: [],
    status: "ouvert",
    createdAt: "2026-09-06T13:10:00.000Z",
  },
];
