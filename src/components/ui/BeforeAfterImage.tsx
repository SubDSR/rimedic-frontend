import { useEffect, useRef, useState } from "react";

interface BeforeAfterImageProps {
  before: string;
  after: string;
  name: string;
}

export function BeforeAfterImage({ before, after, name }: BeforeAfterImageProps) {
  const [showAfter, setShowAfter] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLoop = () => {
    timerRef.current = setInterval(() => setShowAfter((p) => !p), 2400);
  };
  const stopLoop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startLoop();
    return stopLoop;
  }, []);

  return (
    <div
      className="relative overflow-hidden h-56 bg-[#1B2D4F] cursor-pointer"
      onMouseEnter={() => {
        stopLoop();
        setShowAfter(true);
      }}
      onMouseLeave={() => {
        setShowAfter(false);
        startLoop();
      }}
    >
      <img
        src={before}
        alt={`${name} — antes`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          showAfter ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={after}
        alt={`${name} — después`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          showAfter ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-3 left-3 text-[9px] tracking-[0.25em] uppercase px-2 py-1 font-semibold transition-all duration-500 ${
          showAfter ? "bg-[#2E5BA8] text-white" : "bg-white/85 text-[#0A1628]"
        }`}
      >
        {showAfter ? "Después" : "Antes"}
      </div>
    </div>
  );
}
