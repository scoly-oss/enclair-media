import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "En Clair — Le droit et l'économie, sans le jargon",
  description:
    "Le brief juridique et économique pour les dirigeants. Droit social, jurisprudence, analyse économique — sourcé, clair, actionnable.",
  openGraph: {
    title: "En Clair",
    description: "Le droit et l'économie qui comptent. Sans le jargon.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
