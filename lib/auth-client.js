// lib/auth-client.js
//
// Client Better Auth utilisé dans les Client Components (formulaires
// d'inscription / connexion, menu utilisateur...).

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
});
