import { Sparkles, Activity, Award, MapPin } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { RevealDiv } from "@/components/ui/RevealDiv";
import { CREDENTIALS, SERVICES_DATA } from "@/data/constants";
import { TeamSection } from "@/components/sections/TeamSection";
import doctorImg from "@/assets/images/doctor-brayan.png";
import clinicImg from "@/assets/images/clinic-reception.png";

const leftItems = [
  { Icon: Sparkles, ...SERVICES_DATA.medicina },
  { Icon: Activity, ...SERVICES_DATA.aparatologias },
  { Icon: Award, ...SERVICES_DATA.limpieza },
];

export function DoctorSection() {
  return (
    <section id="doctor" className="bg-[#F4F7FB] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] tracking-tight">
            Director Médico
          </h2>
        <p className="text-[#1B2D4F] text-sm tracking-[0.12em] uppercase mt-2 font-medium">
                    Conoce al Dr. Brayan Rivera Serna, nuestro experto en medicina estética y cirugía plástica.
                  </p>
        </div>

        <RevealDiv>
          <div
            className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 8px 60px rgba(10, 22, 40, 0.10), 0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="relative flex flex-col lg:flex-row lg:h-[570px]">
              {/* Fondo difuminado */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px]"
                style={{ backgroundImage: `url(${clinicImg})` }}
              />
              <div className="absolute inset-0 bg-[#0a192f]/10" />
              {/* LEFT — overline, name, description, specialties */}
              <div className="flex-1 flex flex-col justify-center p-8 lg:p-10 lg:pr-6 lg:max-w-[440px] order-2 lg:order-1 bg-white relative z-10">
                <div className="mb-8">
                  <h2
                    className="font-display text-[#0A1628] text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
                  >
                    Dr. Brayan<br />Rivera Serna
                  </h2>
                  <p className="text-[#2E5BA8] text-sm tracking-[0.12em] uppercase mt-2 font-medium">
                    Médico Cirujano · CMP 109761
                  </p>
                </div>

                <div className="h-px bg-[#0A1628]/10 mb-8" />

                <div className="space-y-6">
                  {leftItems.map(({ Icon, label, desc }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#2E5BA8]/10 border border-[#5B9BD5]/40 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#2E5BA8]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0A1628] text-sm leading-tight">{label}</p>
                        <p className="text-[#1B2D4F]/50 text-xs mt-1 leading-snug">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOCTOR IMAGE — centered, overlapping panels on desktop */}
              <div
                className="relative shrink-0 w-64 sm:w-80 lg:w-[380px] mx-auto lg:mx-0 lg:-translate-x-4 order-1 lg:order-2 lg:z-20 lg:-mr-10 bg-transparent z-10"
              >
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-black/10 blur-2xl rounded-full" />
                <img
                  src={doctorImg}
                  alt="Dr. Brayan Rivera Serna — Director Rimedic"
                  className="w-full object-cover object-top"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>

              {/* RIGHT — experience + training panel */}
              <div
                className="rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl overflow-hidden shadow-xl lg:w-[280px] lg:h-full order-3 bg-[#0a192f]/15 relative z-10"
              >
                <div className="flex flex-col lg:h-full p-8 bg-[#0a192f]/85">
                  <div className="mb-6 shrink-0">
                    <p className="text-[#5B9BD5]/60 text-[10px] uppercase tracking-[0.22em] font-semibold">
                      Experiencia
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-display text-white text-4xl font-bold leading-none">10+</span>
                      <span className="text-[#5B9BD5]/70 text-sm">años</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 mb-6 shrink-0" />

                  <div className="lg:flex-1 lg:min-h-0 flex flex-col">
                    <p className="text-[10px] text-[#5B9BD5]/60 uppercase tracking-[0.22em] font-semibold mb-5 shrink-0">
                      Formación Internacional
                    </p>
                    <div className="space-y-5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
                      {CREDENTIALS.map((c, i) => (
                        <div key={i}>
                          <p className="text-white font-semibold text-sm leading-tight">{c.event}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <MapPin className="w-3 h-3 text-[#5B9BD5]/60 shrink-0" />
                            <p className="text-[#5B9BD5]/70 text-xs">{c.country}</p>
                          </div>
                          {i < CREDENTIALS.length - 1 && (
                            <div className="mt-4 h-px bg-white/8" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealDiv>
      </div>

      <div className="mt-20 lg:mt-24">
        <TeamSection />
      </div>
    </section>
  );
}
