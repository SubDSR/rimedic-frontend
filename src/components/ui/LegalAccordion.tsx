import { useState, type ReactNode } from "react";
import { X } from "lucide-react";

export interface LegalSection {
  title: string;
  body: string;
  icon?: ReactNode;
}

interface LegalAccordionProps {
  sections: LegalSection[];
  maxHeight?: string;
}

export function LegalAccordion({ sections, maxHeight = "600px" }: LegalAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIdx((p) => (p === i ? null : i));

  return (
    <>
      {sections.map((s, i) => (
        <div key={i} className="border-b border-[#0A1628]/[0.09]">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4 group"
          >
            <div className="flex items-center gap-3">
              {s.icon && (
                <span className={`transition-colors ${openIdx === i ? "text-[#C9A96E]" : "text-[#0A1628]/30 group-hover:text-[#C9A96E]"}`}>
                  {s.icon}
                </span>
              )}
              <span className={`font-display text-[15px] font-bold transition-colors ${openIdx === i ? "text-[#2E5BA8]" : "text-[#0A1628] group-hover:text-[#2E5BA8]"}`}>
                {s.title}
              </span>
            </div>
            <div className={`w-6 h-6 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIdx === i ? "border-[#2E5BA8] bg-[#2E5BA8] rotate-45" : "border-[#0A1628]/20"}`}>
              <X size={10} className={openIdx === i ? "text-white" : "text-[#0A1628]/40"} />
            </div>
          </button>
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: openIdx === i ? maxHeight : "0px" }}
          >
            <p className="text-[#1B2D4F]/65 text-sm leading-relaxed pb-6 whitespace-pre-line">{s.body}</p>
          </div>
        </div>
      ))}
    </>
  );
}
