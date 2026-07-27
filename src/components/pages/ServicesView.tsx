import { ChevronLeft, MessageCircle } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { RevealDiv } from "@/components/ui/RevealDiv";
import { BeforeAfterImage } from "@/components/ui/BeforeAfterImage";
import { SERVICES_DATA } from "@/data/constants";
import { wa } from "@/data/whatsapp";

interface ServicesViewProps {
  cat: string;
  onBack: () => void;
}

export function ServicesView({ cat, onBack }: ServicesViewProps) {
  const data = SERVICES_DATA[cat];
  if (!data) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F4F7FB] border-b border-[#0A1628]/[0.07] py-3">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center gap-2 text-xs text-[#0A1628]/40">
          <button onClick={onBack} className="hover:text-[#2E5BA8] transition-colors">Inicio</button>
          <span>/</span>
          <span className="text-[#0A1628]/70">{data.label}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <RevealDiv>
            <GoldLabel>{data.label}</GoldLabel>
            <h1 className="font-display text-[#0A1628] text-4xl lg:text-5xl font-bold mb-4">
              Nuestros Tratamientos
            </h1>
            <p className="text-[#1B2D4F]/60 text-base max-w-lg leading-relaxed">{data.desc}</p>
          </RevealDiv>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A1628]/[0.08]">
          {data.items.map((item, i) => (
            <RevealDiv key={i} delay={i * 70}>
              <div className="bg-white group flex flex-col h-full">
                <BeforeAfterImage before={item.before} after={item.after} name={item.name} />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-[#0A1628] text-xl font-bold mb-2 group-hover:text-[#2E5BA8] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[#1B2D4F]/60 text-sm leading-relaxed flex-1 mb-5">{item.desc}</p>
                  <a
                    href={wa(item.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#2E5BA8] hover:bg-[#5B9BD5] text-white text-sm px-5 py-3 transition-colors w-fit"
                  >
                    <MessageCircle size={13} />
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 border border-[#0A1628]/20 hover:border-[#2E5BA8] text-[#0A1628]/60 hover:text-[#2E5BA8] text-sm px-6 py-3 transition-colors"
          >
            <ChevronLeft size={14} />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
