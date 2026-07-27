import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { RevealDiv } from "@/components/ui/RevealDiv";
import { TESTIMONIALS } from "@/data/constants";

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonios" className="bg-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <RevealDiv className="mb-10">
          <GoldLabel>Testimonios</GoldLabel>
          <h2 className="font-display text-[#0A1628] text-3xl lg:text-4xl font-bold">
            Lo que dicen <span className="text-[#2E5BA8]">nuestras pacientes</span>
          </h2>
        </RevealDiv>

        {/* Desktop: 3-column compact */}
        <div className="hidden lg:grid grid-cols-3 gap-px bg-[#0A1628]/[0.07]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              className={`p-6 cursor-pointer transition-all duration-300 ${
                i === idx ? "bg-[#F4F7FB]" : "bg-white hover:bg-[#F4F7FB]/60"
              }`}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={11} className="fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>
              <p className="text-[#1B2D4F]/70 text-[13px] leading-relaxed mb-4 line-clamp-3">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold transition-colors ${
                    i === idx ? "bg-[#2E5BA8]" : "bg-[#5B9BD5]/70"
                  }`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[#0A1628] text-[13px] font-medium">{t.name}</div>
                  <div className="text-[#2E5BA8] text-[11px]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="lg:hidden">
          <div className="bg-[#F4F7FB] p-6">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: TESTIMONIALS[idx].stars }).map((_, si) => (
                <Star key={si} size={12} className="fill-[#C9A96E] text-[#C9A96E]" />
              ))}
            </div>
            <p className="text-[#1B2D4F]/75 text-sm leading-relaxed mb-4">"{TESTIMONIALS[idx].text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2E5BA8] flex items-center justify-center text-white text-xs font-bold">
                {TESTIMONIALS[idx].initials}
              </div>
              <div>
                <div className="text-[#0A1628] text-sm font-medium">{TESTIMONIALS[idx].name}</div>
                <div className="text-[#2E5BA8] text-xs">{TESTIMONIALS[idx].role}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`transition-all duration-300 ${
                  i === idx ? "w-5 h-1.5 bg-[#2E5BA8]" : "w-1.5 h-1.5 rounded-full bg-[#0A1628]/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
