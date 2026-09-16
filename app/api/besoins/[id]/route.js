// app/api/besoins/[id]/route.js
//
// GET /api/besoins/[id] — détail d'un besoin. Utilisé par la page
// /besoins/[id] (SSR, cache: "no-store").

import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const besoin = await Besoin.findById(id)
      .populate("createdBy", "name email")
      .populate("participants", "name");

    if (!besoin) {
      return Response.json({ error: "Besoin introuvable" }, { status: 404 });
    }

    return Response.json(besoin);
  } catch (error) {
    // Cas d'un id qui n'est pas un ObjectId MongoDB valide.
    if (error.name === "CastError") {
      return Response.json({ error: "Identifiant invalide" }, { status: 400 });
    }
    console.error("[GET /api/besoins/[id]]", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
