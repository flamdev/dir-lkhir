// models/Besoin.js
//
// Modèle Mongoose de la collection `besoins`, conforme au cahier des
// charges du projet Dir Khir.

import mongoose from "mongoose";
// Import "de bord" indispensable : enregistre le modèle "User" avant que
// `.populate("createdBy" | "participants" | "savedBy")` en ait besoin,
// quel que soit le fichier qui importe Besoin en premier.
// Chemin relatif (et non l'alias "@/...") pour que ce fichier reste
// importable aussi bien par Next.js que par les scripts Node (scripts/*.mjs).
import "./User.js";

const BesoinSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
      trim: true,
    },
    categorie: {
      type: String,
      required: [true, "La catégorie est requise"],
      enum: ["déménagement", "don", "covoiturage", "soutien scolaire", "autre"],
    },
    ville: {
      type: String,
      required: [true, "La ville est requise"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["ouvert", "termine"],
      default: "ouvert",
    },
    // Bonus (cahier des charges) : badge "Urgent" mis en avant par le
    // propriétaire au moment de la création ou de la modification.
    urgent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Besoin || mongoose.model("Besoin", BesoinSchema);
