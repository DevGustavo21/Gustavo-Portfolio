import type { Metadata } from "next";
import SuspendedClient from "@/components/SuspendedClient";

export const metadata: Metadata = {
  title: "Sitio suspendido",
  description: "Este sitio temporal ha sido retirado del servidor.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/suspended" },
};

export default function SuspendedPage() {
  return <SuspendedClient />;
}
