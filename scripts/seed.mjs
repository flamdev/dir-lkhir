// scripts/seed.mjs
//
// Script de peuplement de MongoDB Atlas avec les données de
// `data/besoins.js`, pour ne pas démarrer avec une liste vide une fois
// la vraie base de données branchée.
//
// Usage (après avoir renseigné MONGODB_URI dans .env.local) :
//   npm run seed
//
// ⚠️ Ce script est un utilitaire de développement : il vide la collection
// `besoins` et les utilisateurs de démo avant de les recréer. Ne jamais
// l'exécuter contre une base de données de production.

import mongoose from "mongoose";
import dbConnect from "../lib/db.js";
import User from "../models/User.js";
import Besoin from "../models/Besoin.js";
import { besoins as seedBesoins } from "../data/besoins.js";

function slugifyEmail(nom) {
  return (
    nom
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // enlève les accents
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/(^\.|\.$)/g, "") + "@dirkhir-demo.test"
  );
}

async function upsertDemoUser(nom) {
  const email = slugifyEmail(nom);

  const user = await User.findOneAndUpdate(
    { email },
    {
      $setOnInsert: {
        name: nom,
        email,
        emailVerified: true,
        image: null,
      },
    },
    { upsert: true, returnDocument: "after" }
  );

  return user;
}

async function seed() {
  await dbConnect();
  console.log("Connecté à MongoDB Atlas.");

  // 1. Crée (ou récupère) un utilisateur de démo par auteur unique.
  const nomsUniques = [...new Set(seedBesoins.map((b) => b.createdBy.nom))];
  const usersByNom = {};
  for (const nom of nomsUniques) {
    usersByNom[nom] = await upsertDemoUser(nom);
  }
  const tousLesUsers = Object.values(usersByNom);
  console.log(`${tousLesUsers.length} utilisateur(s) de démo prêt(s).`);

  // 2. Vide la collection besoins pour repartir d'un état propre.
  await Besoin.deleteMany({});

  // 3. Recrée chaque besoin en remplaçant les données mock (createdBy,
  // participants, savedBy) par de vrais ObjectId utilisateurs.
  for (const mock of seedBesoins) {
    const auteur = usersByNom[mock.createdBy.nom];

    const autresUsers = tousLesUsers.filter(
      (u) => String(u._id) !== String(auteur._id)
    );
    const participants = autresUsers
      .slice(0, mock.participants.length)
      .map((u) => u._id);
    const savedBy = autresUsers
      .slice(0, mock.savedBy.length)
      .map((u) => u._id);

    await Besoin.create({
      titre: mock.titre,
      description: mock.description,
      categorie: mock.categorie,
      ville: mock.ville,
      createdBy: auteur._id,
      participants,
      savedBy,
      status: mock.status,
      createdAt: new Date(mock.createdAt),
    });
  }

  console.log(`${seedBesoins.length} besoin(s) inséré(s) dans MongoDB.`);

  await mongoose.disconnect();
  console.log("Terminé.");
}

seed().catch((error) => {
  console.error("Échec du seed :", error);
  process.exit(1);
});
