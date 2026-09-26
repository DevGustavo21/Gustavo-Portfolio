import type { Metadata } from "next";
import SkillsPage from "@/components/skills/SkillsPage";

export const metadata: Metadata = {
  title: "Skills para Claude",
  description:
    "Skills listas para instalar en Claude: prompts, automatización y productividad. Descarga el Optimizador de Prompts y más herramientas de Gustavo Mejia.",
  alternates: {
    canonical: "/skills",
  },
  openGraph: {
    title: "Skills para Claude — Gustavo Mejia",
    description:
      "Skills listas para instalar en Claude. Descarga el Optimizador de Prompts y filtra por categoría.",
    url: "/skills",
  },
};

export default function SkillsRoute() {
  return <SkillsPage />;
}
