/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Désactive le cache côté navigateur (Router Cache) pour les pages
    // dynamiques (SSR) : sans ça, après une Server Action (participer,
    // enregistrer, marquer fait, supprimer...), la page peut afficher
    // des données périmées pendant un moment même si le cache serveur
    // (revalidatePath / revalidateTag) a bien été invalidé.
    // Note : Next.js impose un minimum de 30s pour les pages statiques/ISR
    // ("static"), c'est pourquoi /besoins et / sont passées en SSR
    // (force-dynamic) plutôt qu'ISR — cf. app/(public)/besoins/page.jsx.
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },
};

export default nextConfig;

