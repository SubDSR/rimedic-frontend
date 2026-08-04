import { useState } from "react";
import { RevealDiv } from "@/components/ui/RevealDiv";
import clinicImg from "@/assets/images/clinic-reception.webp";

const FEATURES = [
  { label: "IPRESS supervisado", sub: "por el MINSA" },
  { label: "+10 Años de", sub: "Experiencia" },
  { label: "Marcas aprobadas", sub: "por la FDA" },
  { label: "Staff de médicos", sub: "capacitados" },
  { label: "Tecnología original", sub: "de Alta Gama" },
  { label: "Consultas médicas", sub: "gratuitas" },
];

/** Hexágono con check — dibujado en SVG puro */
function HexCheck({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-14 h-14 sm:w-16 sm:h-16 transition-all duration-300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z"
        stroke={active ? "#7DC4FF" : "rgba(255,255,255,0.45)"}
        strokeWidth="2.2"
        fill={active ? "rgba(125,196,255,0.15)" : "rgba(255,255,255,0.06)"}
        style={{ transition: "stroke 0.3s, fill 0.3s" }}
      />
      <polyline
        points="21,32 28,40 43,24"
        stroke={active ? "#7DC4FF" : "white"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.3s" }}
      />
    </svg>
  );
}

export function QuienesSomosSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="quienes-somos"
      className="relative bg-[#0A1628] py-16 lg:py-24 overflow-hidden"
    >
      {/* Círculos decorativos de fondo — igual que TestimonialsSection */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.06] bg-[#5B9BD5] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-[0.06] bg-[#5B9BD5] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        {/* Título */}
        <RevealDiv className="text-center mb-10 lg:mb-14">
          <h2 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            ¿Quiénes{" "}
            <span className="text-[#5B9BD5]">Somos?</span>
          </h2>
        </RevealDiv>

        {/* Layout principal: foto + badges */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Foto de la clínica */}
          <RevealDiv className="w-full lg:w-[42%] flex-shrink-0">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.55)" }}
            >
              <img
                src={clinicImg}
                alt="Clínica Rimedic — Instalaciones"
                className="w-full h-64 sm:h-80 lg:h-[340px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
            </div>
          </RevealDiv>

          {/* Grid de badges 3×2 */}
          <div className="w-full lg:flex-1 grid grid-cols-3 gap-x-6 gap-y-10">
            {FEATURES.map((feat, i) => (
              <RevealDiv key={i} delay={i * 70}>
                <div
                  className="flex flex-col items-center text-center cursor-default group"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Hexágono */}
                  <div
                    className="transition-transform duration-300"
                    style={{ transform: hoveredIdx === i ? "scale(1.12)" : "scale(1)" }}
                  >
                    <HexCheck active={hoveredIdx === i} />
                  </div>

                  {/* Texto */}
                  <p
                    className="mt-3 text-[13px] sm:text-sm font-semibold leading-tight transition-colors duration-300"
                    style={{ color: hoveredIdx === i ? "#7DC4FF" : "white" }}
                  >
                    {feat.label}
                  </p>
                  <p
                    className="text-[12px] sm:text-[13px] leading-tight transition-colors duration-300"
                    style={{ color: hoveredIdx === i ? "rgba(125,196,255,0.75)" : "rgba(255,255,255,0.55)" }}
                  >
                    {feat.sub}
                  </p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
