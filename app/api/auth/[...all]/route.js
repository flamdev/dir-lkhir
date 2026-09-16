// app/api/auth/[...all]/route.js
//
// Route Handler catch-all qui expose tous les endpoints Better Auth :
// POST /api/auth/sign-up/email, POST /api/auth/sign-in/email,
// POST /api/auth/sign-out, GET /api/auth/get-session, etc.

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
