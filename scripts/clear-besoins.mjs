// scripts/clear-besoins.mjs
//
// Vide la collection `besoins` de MongoDB Atlas, sans toucher aux
// utilisateurs (collection `user`, gérée par Better Auth).
//
// Usage :
//   npm run clear-besoins

import mongoose from "mongoose";
import dbConnect from "../lib/db.js";
import Besoin from "../models/Besoin.js";

async function clear() {
  await dbConnect();
  console.log("Connecté à MongoDB Atlas.");

  const { deletedCount } = await Besoin.deleteMany({});
  console.log(`${deletedCount} besoin(s) supprimé(s).`);

  await mongoose.disconnect();
  console.log("Terminé.");
}

clear().catch((error) => {
  console.error("Échec :", error);
  process.exit(1);
});
