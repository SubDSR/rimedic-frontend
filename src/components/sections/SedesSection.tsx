import { useState } from "react";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { RevealDiv } from "@/components/ui/RevealDiv";
import { SEDES } from "@/data/constants";
import { wa } from "@/data/whatsapp";

export function SedesSection() {
  const [active, setActive] = useState(0);
  const sede = SEDES[active];

  const contactRows = [
    { Icon: MapPin, label: "Dirección", value: sede.address, sub: sede.city, href: undefined as string | undefined },
    { Icon: Clock, label: "Horario", value: sede.hours, sub: undefined as string | undefined, href: undefined as string | undefined },
    { Icon: Phone, label: "Teléfono", value: sede.phone, sub: undefined as string | undefined, href: `tel:${sede.phone.replace(/\s/g, "")}` },
    { Icon: MessageCircle, label: "WhatsApp", value: sede.whatsapp, sub: undefined as string | undefined, href: wa(`Hola, quisiera consultar sobre la ${sede.name}.`) },
  ];

  return (
    <section id="sedes" className="bg-[#F4F7FB] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <RevealDiv className="mb-10">
          <GoldLabel>Nuestras Sedes</GoldLabel>
          <h2 className="font-display text-[#0A1628] text-3xl lg:text-4xl font-bold">
            Visítanos en <span className="text-[#2E5BA8]">Lima</span>
          </h2>
        </RevealDiv>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-8">
          {SEDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-[13px] px-5 py-2.5 transition-all duration-200 font-medium ${
                i === active
                  ? "bg-[#2E5BA8] text-white"
                  : "bg-white border border-[#0A1628]/10 text-[#0A1628]/55 hover:text-[#0A1628]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <RevealDiv>
            <div className="h-72 lg:h-[380px] overflow-hidden bg-[#1B2D4F]">
              <iframe
                title={`Mapa ${sede.name}`}
                src={sede.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </RevealDiv>

          <RevealDiv delay={120}>
            <div className="bg-white border border-[#0A1628]/[0.07] p-7 h-full flex flex-col justify-center gap-4">
              <h3 className="font-display text-[#0A1628] text-2xl font-bold">{sede.name}</h3>
              {contactRows.map(({ Icon, label, value, sub, href }, i) => (
                <div key={i} className="flex gap-3 py-3.5 border-b border-[#0A1628]/[0.07] last:border-0">
                  <div className="w-9 h-9 bg-[#2E5BA8]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-[#2E5BA8]" />
                  </div>
                  <div>
                    <div className="text-[#0A1628]/38 text-[10px] tracking-[0.25em] uppercase">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("https") ? "_blank" : undefined}
                        rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
                        className="text-[#0A1628] text-sm font-medium hover:text-[#2E5BA8] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-[#0A1628] text-sm font-medium">{value}</div>
                    )}
                    {sub && <div className="text-[#0A1628]/40 text-xs mt-0.5">{sub}</div>}
                  </div>
                </div>
              ))}
              <a
                href={wa(`Hola, quisiera agendar una cita en la ${sede.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#2E5BA8] text-white text-sm px-6 py-3.5 transition-colors duration-200 mt-1"
              >
                <MessageCircle size={14} />
                Agendar en esta sede
              </a>
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
