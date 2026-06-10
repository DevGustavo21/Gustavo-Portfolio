import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SideNav from "@/components/SideNav";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { LanguageProvider } from "@/lib/i18n";

const clashDisplay = localFont({
  src: [
    { path: "./fonts/clash-display-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/clash-display-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: [
    { path: "./fonts/cabinet-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cabinet-grotesk-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gustavomejia.dev").replace(/\/$/, "");

const TITLE = "Gustavo Mejia — Frontend & WordPress Developer";
const DESCRIPTION =
  "Frontend Developer y co-fundador de Crafted Code Hub, agencia web en Managua, Nicaragua. Especializado en Next.js, React, TypeScript, WordPress y animaciones web avanzadas. 6+ años construyendo productos digitales de alto rendimiento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Gustavo Mejia",
  },
  description: DESCRIPTION,
  applicationName: "Gustavo Mejia — Portfolio",
  authors: [{ name: "Gustavo Mejia", url: SITE_URL }],
  creator: "Gustavo Mejia",
  publisher: "Gustavo Mejia",
  keywords: [
    "Gustavo Mejia",
    "Frontend Developer",
    "Desarrollador Frontend",
    "WordPress Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Crafted Code Hub",
    "Managua",
    "Nicaragua",
    "diseño web",
    "desarrollo web",
    "WooCommerce",
    "Framer Motion",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Gustavo Mejia",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@gustavomejia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gustavo Mejia",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  jobTitle: "Frontend Developer & WordPress Expert",
  description: DESCRIPTION,
  email: "mailto:gustavomejiafuentes2111@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Crafted Code Hub",
    url: "https://craftedcodehub.com/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Managua",
    addressCountry: "NI",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "WordPress",
    "WooCommerce",
    "Framer Motion",
    "GSAP",
    "Supabase",
    "UI Design",
  ],
  sameAs: [
    "https://linkedin.com/in/gustavomejia",
    "https://github.com/gustavomejia",
    "https://instagram.com/gustavomejia",
    "https://craftedcodehub.com/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${clashDisplay.variable} ${cabinetGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <SideNav />
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
