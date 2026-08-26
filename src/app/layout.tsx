import type { Metadata } from "next";
import { Archivo, Sora } from "next/font/google";
import "./globals.css";
import "./identity.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rede Pedro Pelanda | A gente te apoia na estrada",
  description:
    "Encontre postos, restaurantes e serviços da Rede Pedro Pelanda no seu caminho.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
