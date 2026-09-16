// lib/auth.js
//
// Configuration Better Auth. Better Auth gère lui-même le hash du mot de
// passe, la création de session et les cookies HttpOnly — aucune logique
// manuelle nécessaire. Il crée et gère automatiquement ses propres
// collections MongoDB (`user`, `session`, `account`, `verification`) via
// le driver natif `mongodb` (pas Mongoose).

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "La variable MONGODB_URI est manquante. Copiez .env.local.example vers " +
      ".env.local et renseignez l'URI de votre cluster MongoDB Atlas."
  );
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // renouvelle si moins d'1 jour restant
  },

  plugins: [
    nextCookies(), // permet d'utiliser Better Auth dans les Server Actions
  ],
});
