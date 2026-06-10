"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />

      <AnimatePresence>
        {loaded && (
          <main>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ServicesSection />
            <PortfolioSection />
            <ContactSection />
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </>
  );
}
