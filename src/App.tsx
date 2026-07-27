import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { FinancingBar } from "@/components/layout/FinancingBar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PromoHighlightsSection } from "@/components/sections/PromoHighlightsSection";
import { DoctorSection } from "@/components/sections/DoctorSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SedesSection } from "@/components/sections/SedesSection";
import { ServicesView } from "@/components/pages/ServicesView";
import { TermsPage } from "@/components/pages/TermsPage";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import type { PageView } from "@/types";

export default function App() {
  const [view, setView] = useState<PageView>("home");

  const goHome = () => {
    setView("home");
    window.scrollTo({ top: 0 });
  };

  const isServices = view === "medicina" || view === "aparatologias" || view === "limpieza";

  return (
    <div className="font-sans overflow-x-hidden bg-white">
      <Header onNav={setView} />

      {view === "home" && (
        <>
          <FinancingBar />
          <HeroSection />
          <PromoHighlightsSection />
          <ServicesSection />
          <DoctorSection />
          <TestimonialsSection />
          <BlogSection />
          <ContactSection />
          <SedesSection />
        </>
      )}

      {isServices && <ServicesView cat={view} onBack={goHome} />}
      {view === "terms" && <TermsPage onBack={goHome} />}
      {view === "privacy" && <PrivacyPage onBack={goHome} />}

      <Footer onNav={setView} />
      <WhatsAppFloat />
    </div>
  );
}
