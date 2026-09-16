// lib/db.js
//
// Connexion MongoDB (Mongoose) en pattern singleton : une seule connexion
// ouverte, réutilisée par tous les appels serveur (Route Handlers, Server
// Components, Server Actions). Sans ce pattern, chaque appel ouvrirait une
// nouvelle connexion et épuiserait rapidement les connexions disponibles
// sur MongoDB Atlas.

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "La variable MONGODB_URI est manquante. Copiez .env.local.example vers " +
      ".env.local et renseignez l'URI de votre cluster MongoDB Atlas."
  );
}

async function dbConnect() {
  // 1 = connected : on ne rouvre pas de connexion si elle existe déjà.
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  return mongoose.connect(MONGODB_URI);
}

export default dbConnect;
