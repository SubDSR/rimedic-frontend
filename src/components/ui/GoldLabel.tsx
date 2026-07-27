import type { ReactNode } from "react";

export function GoldLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-[#C9A96E]" />
      <span className="text-[#C9A96E] text-[10px] tracking-[0.38em] uppercase font-light">
        {children}
      </span>
    </div>
  );
}
