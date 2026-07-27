import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RevealDiv } from "@/components/ui/RevealDiv";
import { PROMOTIONS } from "@/data/constants";
import { wa } from "@/data/whatsapp";

// Triplicamos el arreglo (en vez de clonar solo 1 tarjeta a cada lado) para
// simular loop infinito con scroll nativo. Con hasta 3 tarjetas visibles a
// la vez en desktop, un solo clon por lado no deja suficiente margen de
// scroll para alinear la última tarjeta real contra el borde: el navegador
// clampea scrollLeft antes de que closestSlideIndex() llegue a detectarlo,
// y el salto de loop nunca se dispara. Con un bloque completo extra a cada
// lado siempre hay margen de sobra, sin importar cuántas tarjetas quepan.
const N = PROMOTIONS.length;
const SLIDES = [...PROMOTIONS, ...PROMOTIONS, ...PROMOTIONS];
const REAL_START = N; // inicio del bloque real (el del medio)
const REAL_END = N * 2 - 1; // fin del bloque real (el del medio)

export function PromoHighlightsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0); // índice real (0..N-1), solo para dots
  const isJumping = useRef(false);

  const scrollToSlide = (slideIdx: number, smooth = true) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[slideIdx] as HTMLElement | undefined;
    if (!card) return;
    const left = card.offsetLeft - el.offsetLeft;
    if (smooth) {
      el.scrollTo({ left, behavior: "smooth" });
    } else {
      // Asignación directa: siempre instantánea sin animación (a diferencia
      // de scrollTo({behavior:"auto"}), que en algunos navegadores hereda el
      // scroll-behavior:smooth del CSS y anima igual).
      el.scrollLeft = left;
    }
  };

  const closestSlideIndex = () => {
    const el = scrollerRef.current;
    if (!el) return REAL_START;
    const children = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - el.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    return closest;
  };

  // Posiciona en el primer slide real al montar (sin animación)
  useEffect(() => {
    scrollToSlide(REAL_START, false);
  }, []);

  // Recentra de forma instantánea e imperceptible (misma imagen) ANTES de
  // animar hacia el siguiente/anterior, en vez de esperar a que termine el
  // scroll para corregir después. Así el salto de loop nunca compite contra
  // el ajuste nativo de scroll-snap ni contra la animación en curso — es
  // sincrónico, ocurre en el mismo tick, antes de cualquier repintado, así
  // que el usuario solo ve el resultado final de la animación suave.
  const scroll = (dir: "left" | "right") => {
    const current = closestSlideIndex();
    let base = current;
    if (dir === "right" && current >= REAL_END) {
      base = current - N;
      scrollToSlide(base, false);
    } else if (dir === "left" && current <= REAL_START) {
      base = current + N;
      scrollToSlide(base, false);
    }
    scrollToSlide(dir === "right" ? base + 1 : base - 1, true);
  };

  // Respaldo para arrastre manual (touch/trackpad), que no pasa por scroll():
  // si el usuario desliza directamente hasta la zona de clones, recentra en
  // cuanto el scroll se detiene de verdad.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isJumping.current) return;
      const idx = closestSlideIndex();
      setActiveIdx(((idx - REAL_START) % N + N) % N);
    };

    const correctIfNeeded = () => {
      if (isJumping.current) return;
      const settled = closestSlideIndex();
      if (settled > REAL_END) {
        isJumping.current = true;
        scrollToSlide(settled - N, false);
        isJumping.current = false;
      } else if (settled < REAL_START) {
        isJumping.current = true;
        scrollToSlide(settled + N, false);
        isJumping.current = false;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    if ("onscrollend" in window) {
      el.addEventListener("scrollend", correctIfNeeded);
    }

    let fallbackTimer: ReturnType<typeof setTimeout>;
    const onScrollFallback = () => {
      clearTimeout(fallbackTimer);
      fallbackTimer = setTimeout(correctIfNeeded, 200);
    };
    el.addEventListener("scroll", onScrollFallback, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scroll", onScrollFallback);
      el.removeEventListener("scrollend", correctIfNeeded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section className="bg-white pt-3 lg:pt-4 pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SLIDES.map((promo, i) => (
              <RevealDiv
                key={i}
                delay={i * 60}
                className="flex-shrink-0 snap-start w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <a
                  href={wa(promo.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={promo.img}
                    alt={promo.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
              </RevealDiv>
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#0A1628]/10 shadow-md items-center justify-center text-[#0A1628]/60 hover:text-[#2E5BA8] hover:border-[#2E5BA8]/40 transition-colors z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#0A1628]/10 shadow-md items-center justify-center text-[#0A1628]/60 hover:text-[#2E5BA8] hover:border-[#2E5BA8]/40 transition-colors z-10"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-5">
          {PROMOTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(REAL_START + i)}
              aria-label={`Ir a promoción ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === activeIdx ? "w-5 h-1.5 bg-[#2E5BA8]" : "w-1.5 h-1.5 bg-[#0A1628]/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
