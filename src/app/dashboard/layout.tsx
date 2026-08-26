import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard de Marketing 2027 | Rede Pedro Pelanda",
  description: "Visão anual, mensal e por unidade do calendário de marketing 360º da Rede Pedro Pelanda.",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
