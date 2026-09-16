// proxy.js
//
// Convention Next.js 16 (anciennement `middleware.js` / `middleware`).
// S'exécute avant chaque requête correspondant au `matcher` ci-dessous et
// redirige vers /connexion si aucun cookie de session n'est présent.
//
// ⚠️ Protection de premier niveau (optimiste) : vérifie seulement
// l'existence du cookie, pas sa validité. La vérification complète
// (auth.api.getSession()) reste faite dans chaque page protégée.

import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const url = new URL("/connexion", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profil",
    "/besoins/creer",
    "/besoins/:id/modifier",
    "/besoins-enregistres",
  ],
};
