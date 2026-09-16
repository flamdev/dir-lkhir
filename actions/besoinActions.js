// actions/besoinActions.js
//
// Server Actions liées aux besoins. Contrairement aux Route Handlers
// (lecture seule), les mutations passent par des Server Actions appelées
// directement depuis les formulaires React.

"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";
import { CATEGORIES } from "@/data/besoins";

// Pattern réutilisé par toute action nécessitant que l'utilisateur
// connecté soit bien le propriétaire du besoin : ne jamais faire
// confiance au client pour connaître le propriétaire.
async function verifierProprietaire(besoinId, userId) {
  await dbConnect();
  const besoin = await Besoin.findById(besoinId);

  if (!besoin) {
    return { besoin: null, erreur: "Besoin introuvable." };
  }
  if (besoin.createdBy.toString() !== userId) {
    return { besoin: null, erreur: "Action non autorisée." };
  }

  return { besoin, erreur: null };
}

export async function createBesoin(prevState, formData) {
  // 1. Authentification : impossible de créer un besoin sans être connecté.
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Vous devez être connecté pour publier un besoin." };
  }

  // 2. Extraction et validation des données (jamais faire confiance au
  // client : la validation HTML peut toujours être contournée).
  const titre = formData.get("titre")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const categorie = formData.get("categorie")?.toString();
  const ville = formData.get("ville")?.toString().trim();
  const urgent = formData.get("urgent") === "on";

  if (!titre || titre.length < 3) {
    return { error: "Le titre doit contenir au moins 3 caractères." };
  }
  if (!description || description.length < 10) {
    return { error: "La description doit contenir au moins 10 caractères." };
  }
  if (!CATEGORIES.includes(categorie)) {
    return { error: "Catégorie invalide." };
  }
  if (!ville) {
    return { error: "La ville est requise." };
  }

  // 3. Écriture en base.
  try {
    await dbConnect();
    await Besoin.create({
      titre,
      description,
      categorie,
      ville,
      urgent,
      createdBy: session.user.id,
    });
  } catch (error) {
    console.error("[createBesoin]", error);
    return { error: "Erreur lors de la création du besoin." };
  }

  // 4. Invalide le cache des pages concernées.
  revalidatePath("/");
  revalidatePath("/besoins");

  // redirect() doit toujours être appelé en dehors d'un try/catch.
  redirect("/profil");
}

export async function updateBesoin(prevState, formData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Connexion requise." };
  }

  const id = formData.get("id")?.toString();
  const titre = formData.get("titre")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const categorie = formData.get("categorie")?.toString();
  const ville = formData.get("ville")?.toString().trim();
  const urgent = formData.get("urgent") === "on";

  if (!titre || titre.length < 3) {
    return { error: "Le titre doit contenir au moins 3 caractères." };
  }
  if (!description || description.length < 10) {
    return { error: "La description doit contenir au moins 10 caractères." };
  }
  if (!CATEGORIES.includes(categorie)) {
    return { error: "Catégorie invalide." };
  }
  if (!ville) {
    return { error: "La ville est requise." };
  }

  const { erreur } = await verifierProprietaire(id, session.user.id);
  if (erreur) return { error: erreur };

  try {
    await Besoin.findByIdAndUpdate(id, { titre, description, categorie, ville, urgent });
  } catch (error) {
    console.error("[updateBesoin]", error);
    return { error: "Erreur lors de la modification." };
  }

  revalidatePath("/");
  revalidatePath("/besoins");
  revalidatePath(`/besoins/${id}`);

  redirect(`/besoins/${id}`);
}

export async function deleteBesoin(prevState, formData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Connexion requise." };
  }

  const id = formData.get("id")?.toString();

  const { erreur } = await verifierProprietaire(id, session.user.id);
  if (erreur) return { error: erreur };

  try {
    await Besoin.findByIdAndDelete(id);
  } catch (error) {
    console.error("[deleteBesoin]", error);
    return { error: "Erreur lors de la suppression." };
  }

  revalidatePath("/");
  revalidatePath("/besoins");
  revalidatePath("/profil");

  redirect("/besoins");
}

export async function markAsDone(prevState, formData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Connexion requise." };
  }

  const id = formData.get("id")?.toString();

  const { besoin, erreur } = await verifierProprietaire(id, session.user.id);
  if (erreur) return { error: erreur };

  if (besoin.status === "termine") {
    return { error: "Ce besoin est déjà marqué comme terminé." };
  }

  try {
    await Besoin.findByIdAndUpdate(id, { status: "termine" });
  } catch (error) {
    console.error("[markAsDone]", error);
    return { error: "Erreur lors de la mise à jour." };
  }

  revalidatePath("/");
  revalidatePath("/besoins");
  revalidatePath(`/besoins/${id}`);
  revalidatePath("/profil");

  return { error: null, success: true };
}

export async function toggleParticipation(prevState, formData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Connexion requise pour participer." };
  }

  const id = formData.get("id")?.toString();
  const userId = session.user.id;

  try {
    await dbConnect();
    const besoin = await Besoin.findById(id);

    if (!besoin) return { error: "Besoin introuvable." };
    if (besoin.status === "termine") {
      return { error: "Ce besoin est déjà terminé." };
    }
    if (besoin.createdBy.toString() === userId) {
      return { error: "Vous ne pouvez pas participer à votre propre besoin." };
    }

    const dejaParticipant = besoin.participants
      .map((p) => p.toString())
      .includes(userId);

    if (dejaParticipant) {
      await Besoin.findByIdAndUpdate(id, { $pull: { participants: userId } });
    } else {
      await Besoin.findByIdAndUpdate(id, { $push: { participants: userId } });
    }

    revalidatePath("/");
    revalidatePath("/besoins");
    revalidatePath(`/besoins/${id}`);
    revalidatePath("/profil");

    return { error: null, success: true };
  } catch (error) {
    console.error("[toggleParticipation]", error);
    return { error: "Erreur serveur." };
  }
}

export async function toggleSave(prevState, formData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Connexion requise pour enregistrer un besoin." };
  }

  const id = formData.get("id")?.toString();
  const userId = session.user.id;

  try {
    await dbConnect();
    const besoin = await Besoin.findById(id);

    if (!besoin) return { error: "Besoin introuvable." };

    const dejaEnregistre = besoin.savedBy
      .map((s) => s.toString())
      .includes(userId);

    if (dejaEnregistre) {
      await Besoin.findByIdAndUpdate(id, { $pull: { savedBy: userId } });
    } else {
      await Besoin.findByIdAndUpdate(id, { $push: { savedBy: userId } });
    }

    revalidatePath("/");
    revalidatePath("/besoins");
    revalidatePath(`/besoins/${id}`);
    revalidatePath("/besoins-enregistres");

    return { error: null, success: true };
  } catch (error) {
    console.error("[toggleSave]", error);
    return { error: "Erreur serveur." };
  }
}
