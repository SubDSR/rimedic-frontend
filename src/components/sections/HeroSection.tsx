import heroPlaceholder from "@/assets/images/hero-banner-placeholder.webp";
import { wa } from "@/data/whatsapp";

export function HeroSection() {
  return (
    <section id="hero" className="bg-white pt-3 sm:pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <a
          href={wa("Hola, me interesa la promo del mes.")}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-3xl overflow-hidden border border-[#0A1628]/[0.06] shadow-sm"
        >
          {/* Contenedor de altura FIJA: si la imagen es más grande que esto,
              se recorta y centra automáticamente con object-cover + object-center */}
          <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px] bg-[#0A1628]">
            <img
              src={heroPlaceholder}
              alt="Promoción del mes — Rimedic"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
