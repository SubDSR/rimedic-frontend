import type { ReactNode } from "react";

export function GoldLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-[#0A1628]/50" />
      <span className="text-[#0A1628]/60 text-[10px] tracking-[0.38em] uppercase font-medium">
        {children}
      </span>
    </div>
  );
}
