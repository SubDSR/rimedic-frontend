import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealDiv({ children, className = "", delay = 0 }: RevealDivProps) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
