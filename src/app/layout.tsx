import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "En Clair — Ce qui peut vous coûter cher, avant que ça vous coûte cher",
  description:
    "Droit social, paie, jurisprudence — le brief hebdo pour les dirigeants, DRH, DAF et experts-comptables qui veulent voir les risques avant de les payer.",
  openGraph: {
    title: "En Clair",
    description: "Ce qui peut vous coûter cher — avant que ça vous coûte cher. Le brief juridique pour ceux qui décident.",
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
