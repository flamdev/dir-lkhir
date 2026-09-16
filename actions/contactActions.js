// actions/contactActions.js
//
// Server Action du formulaire de contact. Accessible sans connexion :
// aucune vérification de session ici.

"use server";

import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function sendContactMessage(prevState, formData) {
  const nom = formData.get("nom")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!nom || nom.length < 2) {
    return { error: "Le nom est requis.", success: false };
  }
  if (!email?.includes("@")) {
    return { error: "L'email est invalide.", success: false };
  }
  if (!message || message.length < 10) {
    return { error: "Le message doit contenir au moins 10 caractères.", success: false };
  }

  try {
    await dbConnect();
    await Message.create({ nom, email, message });
  } catch (error) {
    console.error("[sendContactMessage]", error);
    return { error: "Erreur lors de l'envoi du message.", success: false };
  }

  return { error: null, success: true };
}
