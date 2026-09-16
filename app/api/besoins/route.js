// app/api/besoins/route.js
//
// GET /api/besoins — liste des besoins, avec filtres optionnels en query
// params (?categorie=...&ville=...). Lecture seule : les mutations
// (créer/modifier/supprimer) sont des Server Actions, pas des
// Route Handlers.

import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const categorie = searchParams.get("categorie");
    const ville = searchParams.get("ville");

    const filtre = {};
    if (categorie) filtre.categorie = categorie;
    if (ville) filtre.ville = ville;

    const besoins = await Besoin.find(filtre)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return Response.json(besoins);
  } catch (error) {
    console.error("[GET /api/besoins]", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
