"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Lang = "es" | "en";

const es = {
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    experience: "Experiencia",
    services: "Servicios",
    portfolio: "Portafolio",
    contact: "Contacto",
  },
  navMobileTag: "CRAFTED CODE HUB · MANAGUA NI",
  hero: {
    label: "Frontend Developer — Co-fundador Crafted Code Hub — Managua, NI",
    descr:
      "Co-fundador de Crafted Code Hub. Construyo experiencias web que combinan precisión técnica con sensibilidad visual. Clientes en Nicaragua, Panamá y Latinoamérica.",
    ctaWork: "[ Ver trabajo ]",
    ctaTalk: "[ Hablemos ]",
    sideLabel: "Disponible para proyectos — 2025",
    scroll: "scroll",
    stats: [
      { value: "6+", label: "Años de experiencia" },
      { value: "30+", label: "Proyectos entregados" },
      { value: "3", label: "Países activos" },
      { value: "2025", label: "WordCamp San José" },
    ],
  },
  about: {
    index: "002 / 006 — SOBRE MÍ",
    heading: "Un developer que también piensa en diseño.",
    p1before: "Soy Gustavo Mejia, Frontend Developer y co-fundador de ",
    p1link: "Crafted Code Hub",
    p1after:
      ", agencia web basada en Managua, Nicaragua. Con 6 años de experiencia, construyo productos digitales de alto rendimiento que no sacrifican la estética por la funcionalidad.",
    p2: "No traduzco mockups: los interpreto, los cuestiono y los mejoro. El diseño es parte integral de mi proceso técnico, no un complemento.",
    p3before: "Speaker en ",
    p3strong: "WordCamp San José 2025",
    p3after:
      ", donde presenté sobre performance web avanzada y arquitectura WordPress headless.",
    photoCaption: "WORDCAMP SAN JOSÉ 2025",
    badge: "6 AÑOS · CCH",
    tableHeader: "STACK / NIVEL / DESDE",
    since: "DESDE",
    levels: { Expert: "Experto", Advanced: "Avanzado", Proficient: "Competente" } as Record<string, string>,
  },
  experience: {
    index: "003 / 006 — EXPERIENCIA",
    heading: "Dónde he construido.",
    roles: [
      {
        title: "Freelancer & Digital Product Builder",
        company: "Independiente",
        period: "Feb 2026 — Actualidad",
        type: "Emprendimiento · IA",
        description:
          "Aprovechando las capacidades de la IA, desarrollo productos digitales que resuelven problemas reales para empresas y equipos. No solo código por encargo — sino herramientas propias como Business Scrapper y Webplify que generan valor a escala, sin depender de un cliente único.",
      },
      {
        title: "Co-fundador & Tech Lead",
        company: "Crafted Code Hub",
        period: "2024 — Actualidad",
        type: "Agencia Web · Liderazgo",
        description:
          "Cofundé Crafted Code Hub con la visión de construir productos web de alto nivel para LatAm y mercados internacionales. Lidero el equipo técnico, gestiono relaciones con clientes, defino la arquitectura de proyectos y distribuyo responsabilidades. Responsable de convertir prospectos en clientes y de mantener los estándares de calidad que diferencian a la agencia.",
      },
      {
        title: "WordPress Developer",
        company: "Kronoscode",
        period: "2023 — Actualidad",
        type: "Desarrollo · Custom",
        description:
          "Desarrollo WordPress avanzado enfocado en código limpio y sin dependencia de plugins innecesarios. Trabajo con Advanced Custom Fields Pro, PHP custom, Sass, jQuery, WooCommerce y JavaScript. Cada funcionalidad es construida desde cero — themes custom, integraciones a medida y arquitecturas escalables pensadas para durar.",
      },
      {
        title: "Mid Senior Developer",
        company: "NetForemost",
        period: "Jun 2024 — Ene 2025",
        type: "Agencia · Remoto",
        description:
          "Responsable del stack WordPress en proyectos de alto valor para clientes internacionales. Trabajé con React, Vue.js, Dato CMS y Strapi, liderando la implementación técnica para marcas como Deepgram, The Many y Artlabs.ai. Mantuve reuniones directas con clientes en inglés, coordinando entregas y definiendo soluciones técnicas en ambientes ágiles.",
      },
    ],
  },
  services: {
    index: "004 / 006 — SERVICIOS",
    heading: "Lo que construyo.",
    items: [
      {
        title: "Web Development",
        subtitle: "Next.js · React · TypeScript",
        description:
          "Aplicaciones web de alto rendimiento construidas con tecnologías modernas. Desde landing pages hasta plataformas complejas — arquitectura limpia, código mantenible, resultados medibles.",
      },
      {
        title: "WordPress",
        subtitle: "Themes · WooCommerce · Headless",
        description:
          "WordPress como plataforma seria: themes custom, plugins a medida, WooCommerce avanzado, y arquitecturas headless con Next.js como frontend.",
      },
      {
        title: "UI/UX Implementation",
        subtitle: "Figma → Código · Design Systems",
        description:
          "Transformo diseños en experiencias reales. Implementación pixel-perfect con sistemas de diseño escalables. Trabajo directo con equipos de diseño o a partir de briefs.",
      },
      {
        title: "Performance & Animation",
        subtitle: "GSAP · Framer Motion · Lenis",
        description:
          "Animaciones que complementan la experiencia, no la interrumpen. Optimización de Core Web Vitals, scroll fluido y micro-interacciones que distinguen un sitio del resto.",
      },
      {
        title: "AI-Powered Workflows",
        subtitle: "Automatización · Integración · Agentes",
        description:
          "Integración de IA en productos digitales: flujos automatizados, generación de contenido, chatbots y agentes conectados a tu stack existente.",
      },
    ],
  },
  portfolio: {
    index: "005 / 006 — PORTAFOLIO",
    heading: "Trabajo selecto.",
    filters: [
      { value: "all", label: "Todos" },
      { value: "site", label: "Sitios" },
      { value: "tool", label: "Herramientas" },
    ],
    viewSite: "Ver sitio ↗",
    projects: [
      { client: "Plataforma · Talento", description: "Conecta talento latinoamericano con empresas remotas de todo el mundo." },
      { client: "E-commerce · Food", description: "E-commerce y experiencia de marca para empresa artesanal de alimentos en EE.UU." },
      { client: "Corporativo", description: "Sitio corporativo con interacciones modernas y animaciones de alto impacto." },
      { client: "Marca · Food", description: "Identidad digital y experiencia de pedido para marca de alimentos en LatAm." },
      { client: "Construcción · Utah", description: "Presencia digital de alto impacto para empresa constructora en Utah, EE.UU." },
      { client: "SaaS · Lead Generation", description: "Extrae datos de negocios desde Google Maps para acelerar prospección comercial. Sin ir card por card." },
      { client: "Dev Tool · Utilidad", description: "Convierte imágenes PNG y JPG a WebP optimizado. Drag & drop, procesamiento instantáneo." },
    ],
  },
  contact: {
    index: "006 / 006 — CONTACTO",
    heading: "¿Tienes un proyecto?",
    copyIdle: "→ Click para copiar",
    copyDone: "✓ Copiado al portapapeles",
    socials: "REDES",
    copyAria: "Copiar email",
    form: {
      name: "NOMBRE",
      email: "EMAIL",
      message: "MENSAJE",
      namePh: "tu_nombre",
      emailPh: "tu@email.com",
      messagePh: "cuéntame_tu_proyecto",
      send: "Iniciar proyecto →",
      sending: "Enviando...",
      sentTitle: "Enviado.",
      sentBody: "Te respondo en menos de 24h.",
    },
  },
  footer: {
    identity: "IDENTIDAD",
    role: "Frontend Developer & WordPress Expert",
    cofounder: "Co-fundador,",
    location: "Managua, Nicaragua 🇳🇮",
    navigation: "NAVEGACIÓN",
    contactLabel: "CONTACTO",
    rights: "Todos los derechos reservados",
  },
  suspended: {
    statusTag: "ERROR 503 · SERVICIO SUSPENDIDO",
    metaLeft: "HOST · GUSTAVO MEJIA",
    metaRight: "CRAFTED CODE HUB",
    title: "Tu sitio temporal ha sido bajado del servidor.",
    p1: "Este sitio web estaba alojado de forma temporal como parte de un proyecto en desarrollo. Ha sido retirado del servidor por falta de respuesta o seguimiento por parte del cliente.",
    p2: "Si eres el propietario y deseas volver a ver tu sitio o reactivar el alojamiento, ponte en contacto directamente con el hoster. Con gusto restauramos el acceso.",
    contactLabel: "CONTACTAR AL HOSTER",
    back: "Regresar al inicio",
    terminal: [
      "> verificando estado del despliegue...",
      "> deployment: SUSPENDIDO",
      "> motivo: sin respuesta del cliente",
      "> acción requerida: contactar al hoster",
    ],
    terminalHighlights: ["SUSPENDIDO", "sin respuesta del cliente"],
  },
};

const en: typeof es = {
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
  },
  navMobileTag: "CRAFTED CODE HUB · MANAGUA NI",
  hero: {
    label: "Frontend Developer — Crafted Code Hub Co-founder — Managua, NI",
    descr:
      "Co-founder of Crafted Code Hub. I build web experiences that blend technical precision with visual sensibility. Clients across Nicaragua, Panama and Latin America.",
    ctaWork: "[ View work ]",
    ctaTalk: "[ Let's talk ]",
    sideLabel: "Available for projects — 2025",
    scroll: "scroll",
    stats: [
      { value: "6+", label: "Years of experience" },
      { value: "30+", label: "Projects delivered" },
      { value: "3", label: "Active countries" },
      { value: "2025", label: "WordCamp San José" },
    ],
  },
  about: {
    index: "002 / 006 — ABOUT",
    heading: "A developer who also thinks in design.",
    p1before: "I'm Gustavo Mejia, Frontend Developer and co-founder of ",
    p1link: "Crafted Code Hub",
    p1after:
      ", a web agency based in Managua, Nicaragua. With 6 years of experience, I build high-performance digital products that never sacrifice aesthetics for functionality.",
    p2: "I don't just translate mockups: I interpret them, question them and improve them. Design is an integral part of my technical process, not an add-on.",
    p3before: "Speaker at ",
    p3strong: "WordCamp San José 2025",
    p3after:
      ", where I spoke about advanced web performance and headless WordPress architecture.",
    photoCaption: "WORDCAMP SAN JOSÉ 2025",
    badge: "6 YRS · CCH",
    tableHeader: "STACK / LEVEL / SINCE",
    since: "SINCE",
    levels: { Expert: "Expert", Advanced: "Advanced", Proficient: "Proficient" },
  },
  experience: {
    index: "003 / 006 — EXPERIENCE",
    heading: "Where I've built.",
    roles: [
      {
        title: "Freelancer & Digital Product Builder",
        company: "Independent",
        period: "Feb 2026 — Present",
        type: "Entrepreneurship · AI",
        description:
          "Leveraging the power of AI, I build digital products that solve real problems for companies and teams. Not just code on demand — but my own tools like Business Scrapper and Webplify that generate value at scale, without depending on a single client.",
      },
      {
        title: "Co-founder & Tech Lead",
        company: "Crafted Code Hub",
        period: "2024 — Present",
        type: "Web Agency · Leadership",
        description:
          "I co-founded Crafted Code Hub with the vision of building high-end web products for LatAm and international markets. I lead the technical team, manage client relationships, define project architecture and delegate responsibilities. Responsible for turning prospects into clients and upholding the quality standards that set the agency apart.",
      },
      {
        title: "WordPress Developer",
        company: "Kronoscode",
        period: "2023 — Present",
        type: "Development · Custom",
        description:
          "Advanced WordPress development focused on clean code with no reliance on unnecessary plugins. I work with Advanced Custom Fields Pro, custom PHP, Sass, jQuery, WooCommerce and JavaScript. Every feature is built from scratch — custom themes, bespoke integrations and scalable architectures built to last.",
      },
      {
        title: "Mid Senior Developer",
        company: "NetForemost",
        period: "Jun 2024 — Jan 2025",
        type: "Agency · Remote",
        description:
          "Responsible for the WordPress stack on high-value projects for international clients. I worked with React, Vue.js, Dato CMS and Strapi, leading technical implementation for brands like Deepgram, The Many and Artlabs.ai. I held client meetings directly in English, coordinating deliveries and defining technical solutions in agile environments.",
      },
    ],
  },
  services: {
    index: "004 / 006 — SERVICES",
    heading: "What I build.",
    items: [
      {
        title: "Web Development",
        subtitle: "Next.js · React · TypeScript",
        description:
          "High-performance web applications built with modern technologies. From landing pages to complex platforms — clean architecture, maintainable code, measurable results.",
      },
      {
        title: "WordPress",
        subtitle: "Themes · WooCommerce · Headless",
        description:
          "WordPress as a serious platform: custom themes, bespoke plugins, advanced WooCommerce, and headless architectures with Next.js as the frontend.",
      },
      {
        title: "UI/UX Implementation",
        subtitle: "Figma → Code · Design Systems",
        description:
          "I turn designs into real experiences. Pixel-perfect implementation with scalable design systems. I work directly with design teams or from briefs.",
      },
      {
        title: "Performance & Animation",
        subtitle: "GSAP · Framer Motion · Lenis",
        description:
          "Animations that complement the experience instead of interrupting it. Core Web Vitals optimization, smooth scrolling and micro-interactions that set a site apart.",
      },
      {
        title: "AI-Powered Workflows",
        subtitle: "Automation · Integration · Agents",
        description:
          "AI integration into digital products: automated workflows, content generation, chatbots and agents connected to your existing stack.",
      },
    ],
  },
  portfolio: {
    index: "005 / 006 — PORTFOLIO",
    heading: "Selected work.",
    filters: [
      { value: "all", label: "All" },
      { value: "site", label: "Sites" },
      { value: "tool", label: "Tools" },
    ],
    viewSite: "View site ↗",
    projects: [
      { client: "Platform · Talent", description: "Connects Latin American talent with remote companies around the world." },
      { client: "E-commerce · Food", description: "E-commerce and brand experience for an artisan food company in the U.S." },
      { client: "Corporate", description: "Corporate site with modern interactions and high-impact animations." },
      { client: "Brand · Food", description: "Digital identity and ordering experience for a food brand in LatAm." },
      { client: "Construction · Utah", description: "High-impact digital presence for a construction company in Utah, USA." },
      { client: "SaaS · Lead Generation", description: "Extracts business data from Google Maps to speed up sales prospecting. No going card by card." },
      { client: "Dev Tool · Utility", description: "Convert PNG and JPG images to optimized WebP. Drag & drop, instant processing." },
    ],
  },
  contact: {
    index: "006 / 006 — CONTACT",
    heading: "Got a project?",
    copyIdle: "→ Click to copy",
    copyDone: "✓ Copied to clipboard",
    socials: "SOCIALS",
    copyAria: "Copy email",
    form: {
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      namePh: "your_name",
      emailPh: "you@email.com",
      messagePh: "tell_me_your_project",
      send: "Start project →",
      sending: "Sending...",
      sentTitle: "Sent.",
      sentBody: "I'll reply within 24h.",
    },
  },
  footer: {
    identity: "IDENTITY",
    role: "Frontend Developer & WordPress Expert",
    cofounder: "Co-founder,",
    location: "Managua, Nicaragua 🇳🇮",
    navigation: "NAVIGATION",
    contactLabel: "CONTACT",
    rights: "All rights reserved",
  },
  suspended: {
    statusTag: "ERROR 503 · SERVICE SUSPENDED",
    metaLeft: "HOST · GUSTAVO MEJIA",
    metaRight: "CRAFTED CODE HUB",
    title: "Your temporary site has been taken down.",
    p1: "This website was hosted temporarily as part of a project in progress. It has been removed from the server due to a lack of response or follow-up from the client.",
    p2: "If you're the owner and would like to see your site again or reactivate the hosting, please contact the host directly. We'll be glad to restore access.",
    contactLabel: "CONTACT THE HOST",
    back: "Back to home",
    terminal: [
      "> checking deployment status...",
      "> deployment: SUSPENDED",
      "> reason: no response from client",
      "> action required: contact the host",
    ],
    terminalHighlights: ["SUSPENDED", "no response from client"],
  },
};

export const translations: Record<Lang, typeof es> = { es, en };
export type Translation = typeof es;

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Deterministic default for SSR/first paint; real language is resolved on mount.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let resolved: Lang | null = null;
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "es" || stored === "en") resolved = stored;
    } catch {}
    if (!resolved) {
      const nav = typeof navigator !== "undefined" ? navigator.language || "" : "";
      resolved = nav.toLowerCase().startsWith("es") ? "es" : "en";
    }
    setLangState(resolved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "es" ? "en" : "es";
      try {
        localStorage.setItem("lang", next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
