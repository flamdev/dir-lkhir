// app/api/besoins/recents/route.js
//
// GET /api/besoins/recents — les 6 besoins les plus récents, utilisés par
// la page d'accueil (ISR, revalidate = 60).

import dbConnect from "@/lib/db";
import Besoin from "@/models/Besoin";

export async function GET() {
  try {
    await dbConnect();

    const besoins = await Besoin.find({ status: "ouvert" })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    return Response.json(besoins);
  } catch (error) {
    console.error("[GET /api/besoins/recents]", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
