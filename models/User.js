// models/User.js
//
// Better Auth gère lui-même la collection `user` (création, hash du mot
// de passe, sessions...).
// Ce modèle Mongoose n'est PAS utilisé pour créer ou modifier des
// utilisateurs : il sert uniquement de "vue en lecture" sur la même
// collection MongoDB, pour pouvoir faire `.populate("createdBy")` depuis
// le modèle Besoin et afficher le nom de l'auteur d'un besoin.

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    emailVerified: Boolean,
    image: String,
  },
  {
    // Mappe explicitement sur la collection créée par Better Auth
    // (nom singulier par défaut de l'adapter MongoDB).
    collection: "user",
    timestamps: true,
    // Better Auth peut stocker des champs supplémentaires (providers,
    // twoFactor...) : on ne veut pas que Mongoose les rejette.
    strict: false,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
