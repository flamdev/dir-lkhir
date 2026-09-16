// models/Message.js
//
// Modèle Mongoose de la collection `messages` (formulaire de contact),
// conforme au cahier des charges.

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Le message est requis"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
