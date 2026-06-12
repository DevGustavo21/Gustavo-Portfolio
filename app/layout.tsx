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

const TITLE = "Gustavo Mejia — Desarrollador Web y WordPress en Nicaragua";
const DESCRIPTION =
  "Desarrollador Web y experto en WordPress en Managua, Nicaragua. Creo sitios web rápidos y a medida: WordPress, WooCommerce, webs para real estate y proyectos a medida. Clientes en Nicaragua, Latinoamérica y Florida, EE.UU.";

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
    "Desarrollador Web",
    "Desarrollador Web Nicaragua",
    "Desarrollador WordPress",
    "Desarrollo WordPress",
    "Desarrollo WordPress Florida",
    "Desarrollo de sitios web para real estate",
    "Real estate web development",
    "Páginas web Nicaragua",
    "Diseño web Managua",
    "WordPress Nicaragua",
    "WooCommerce",
    "Web developer Florida",
    "Next.js",
    "Astro",
    "Vue.js",
    "Laravel",
    "Sass",
    "Crafted Code Hub",
    "Managua",
    "Nicaragua",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Gustavo Mejia — Desarrollador Web & WordPress",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Gustavo Mejia — Desarrollador Web y WordPress en Nicaragua",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@gustavomejia",
    images: ["/opengraph-image.png"],
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
  verification: {
    google: "YSBke5a_qSKB8y0xNuQmHUNLPsH_OfAtz-4Qm1TobdI",
  },
  other: {
    "geo.region": "NI-MN",
    "geo.placename": "Managua, Nicaragua",
    "geo.position": "12.114993;-86.236174",
    ICBM: "12.114993, -86.236174",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

const SAME_AS = [
  "https://www.linkedin.com/in/gustavomejia21",
  "https://github.com/DevGustavo21",
  "https://www.instagram.com/gustmejiafuentes",
  "https://craftedcodehub.com/",
];

const AREA_SERVED = [
  { "@type": "Country", name: "Nicaragua" },
  { "@type": "AdministrativeArea", name: "Managua, Nicaragua" },
  { "@type": "AdministrativeArea", name: "Florida, Estados Unidos" },
  { "@type": "Place", name: "Latinoamérica" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Gustavo Mejia",
      alternateName: "Gustavo Adolfo Mejía Fuentes",
      url: SITE_URL,
      image: `${SITE_URL}/icon.svg`,
      jobTitle: "Desarrollador Web & Experto en WordPress",
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
        addressRegion: "Managua",
        addressCountry: "NI",
      },
      knowsAbout: [
        "Desarrollo Web",
        "WordPress",
        "WooCommerce",
        "ACF Pro",
        "Sitios web para real estate",
        "Next.js",
        "Astro",
        "Vue.js",
        "Laravel",
        "Sass",
        "UI/UX Design",
      ],
      knowsLanguage: ["es", "en"],
      sameAs: SAME_AS,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Gustavo Mejia — Desarrollo Web & WordPress",
      url: SITE_URL,
      image: `${SITE_URL}/icon.svg`,
      description:
        "Servicios de desarrollo web y WordPress a medida: sitios corporativos, WooCommerce y webs para real estate. Atención a clientes en Nicaragua, Latinoamérica y Florida, EE.UU.",
      priceRange: "$$",
      founder: { "@id": `${SITE_URL}/#person` },
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: AREA_SERVED,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Managua",
        addressRegion: "Managua",
        addressCountry: "NI",
      },
      serviceType: [
        "Desarrollo Web",
        "Desarrollo WordPress",
        "Sitios web para real estate",
        "WooCommerce / E-commerce",
        "Diseño UI/UX",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de desarrollo web",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo Web a medida",
              description: "Sitios web rápidos, escalables y optimizados para SEO con Next.js, Astro o WordPress.",
              areaServed: AREA_SERVED,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo WordPress",
              description: "Themes a medida, ACF Pro y WooCommerce sin plugins innecesarios.",
              areaServed: AREA_SERVED,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sitios web para Real Estate",
              description: "Webs inmobiliarias con listados, búsqueda y captación de leads para Florida y Latinoamérica.",
              areaServed: AREA_SERVED,
            },
          },
        ],
      },
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Gustavo Mejia",
      description: DESCRIPTION,
      inLanguage: ["es", "en"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
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
      <body className="antialiased" suppressHydrationWarning>
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
