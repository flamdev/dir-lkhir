import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  title: "Dir Khir — Entraide entre citoyens",
  description:
    "Dir Khir est une plateforme communautaire qui permet à des citoyens marocains d'exprimer un besoin d'aide et à d'autres de proposer leur participation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cairo.variable} h-full`}>
      <body className="flex h-full min-h-screen flex-col bg-sand-50 font-sans text-night antialiased">
        {children}
      </body>
    </html>
  );
}
