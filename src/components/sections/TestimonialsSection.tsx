import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import actor1 from "../../assets/images/testimonios/actor1.webp";
import actor2 from "../../assets/images/testimonios/actor2.webp";
import actor3 from "../../assets/images/testimonios/actor3.webp";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  image: string;
  /** Tamaño/posición de la caja contenedora. NUNCA se usa para recortar. */
  frameClass?: string;
  /**
   * object-position del <img> (sin zoom). Controla desde qué lado se ve
   * completa la foto: "object-left-bottom" = se ve completo el lado
   * izquierdo, el sobrante se recorta por la derecha (que es el lado
   * pegado al borde de la card). Por defecto queda centrada.
   */
  objectPositionClass?: string;
  /**
   * 0–100 opcional: además del object-position, aplica zoom + paneo hacia
   * la derecha. Úsalo solo si además de recortar quieres acercar la foto.
   * 0 = sin zoom (default).
   */
  focus?: number;
}

/** Traduce el 0–100 de `focus` a un transform CSS: zoom + paneo hacia la derecha acoplados. */
function getFocusStyle(focus = 0) {
  const t = Math.max(0, Math.min(100, focus)) / 100;
  const scale = 1 + t * 0.3; // 1.0 (sin zoom) → 1.3 (cerrado, sin tapar el texto ni cortar la cara)
  const originX = 50 + t * 35; // 50% (centrado) → 85% (desplazado a la derecha, sin llegar al borde)
  return {
    transform: `scale(${scale})`,
    transformOrigin: `${originX}% 100%`, // el ancla siempre queda abajo (object-bottom)
  };
}

// Alto fijo de la card principal y cuánto sobresale la foto por arriba.
// Fijos (no min-h) a propósito: el "remate" de arriba necesita saber el
// alto exacto de la card para alinear su recorte sin dejar costura.
const MAIN_CARD_H = 500;
const MAIN_CARD_POKE = 64;

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Érika Villalobos",
    role: "Actriz y Cantante",
    image: actor3,
    text: "Siempre he sido cuidadosa con mi piel, pero en Rimedic encontré un equipo que entiende mis necesidades. El trato humano y la atención personalizada marcan la diferencia.",
    frameClass: "w-[50%]",
    focus: 0,
  },
  {
    name: "Erick Elera",
    role: "Actor y Cantante",
    image: actor1,
    text: "Desde la primera consulta supe que estaba en buenas manos. Los resultados superaron mis expectativas y lo más importante, se ve natural. Ahora recomiendo Rimedic a todos mis colegas.",
    frameClass: "w-[55%]",
    objectPositionClass: "object-[left_bottom]",
  },
  {
    name: "Diego Bertie",
    role: "Actor y Cantante",
    image: actor2,
    text: "La profesionalidad y calidez del equipo de Rimedic me inspiraron una confianza total. Cada procedimiento fue explicado con claridad y el acompañamiento post-tratamiento fue impecable.",
    frameClass: "w-[60%]",
    objectPositionClass: "object-[left_bottom]",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const len = TESTIMONIALS.length;

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + len) % len), [len]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, isPaused]);

  const main = TESTIMONIALS[activeIndex];
  const secondary1 = TESTIMONIALS[(activeIndex + 1) % len];
  const secondary2 = TESTIMONIALS[(activeIndex + 2) % len];

  return (
    <section id="testimonios" className="relative bg-[#0A1628] py-20 lg:py-28 overflow-hidden">
      {/* Comilla gigante como marca de agua */}
      <span
        aria-hidden="true"
        className="absolute -top-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 font-serif text-white/[0.04] text-[380px] lg:text-[480px] leading-none pointer-events-none select-none"
      >
        &ldquo;
      </span>
      {/* Resplandor suave único, no manchas de colores */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2E5BA8]/[0.08] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        {/* Cabecera */}
        <div className="relative flex items-start justify-between gap-4 mb-12">
          <div className="hidden lg:block w-full h-px bg-white/[0.08] absolute left-0 -bottom-6" />
          <div>
            <span className="text-[#5B9BD5] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-2 block">
              Testimonios
            </span>
            <h2 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Lo que dicen{" "}
              <span className="text-[#5B9BD5]">nuestros pacientes</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Historias reales de personas que confiaron en Rimedic.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 mt-2">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#F4F7FB] transition-colors shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E5BA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="w-11 h-11 rounded-full bg-[#2E5BA8] flex items-center justify-center hover:bg-[#1b3d7a] transition-colors shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6L15 12L9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: Grid asimétrico */}
        <div
          className="hidden lg:grid grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Tarjeta Principal — Érika Villalobos */}
          <div className="col-span-2 relative">
            {/* Remate: la porción de la foto que sobresale por ARRIBA de la card.
                Recorte redondeado (rounded-t-3xl) que empalma exactamente con la
                esquina superior de la card de abajo — misma imagen, mismo ancho,
                desplazada para que el corte quede perfectamente continuo. */}
            <div
              className={`absolute bottom-full right-0 overflow-hidden rounded-t-3xl pointer-events-none z-0 ${main.frameClass ?? "w-[60%]"}`}
              style={{ height: MAIN_CARD_POKE }}
            >
              <img
                src={main.image}
                alt=""
                aria-hidden="true"
                className={`absolute w-full object-cover ${main.objectPositionClass ?? "object-bottom"}`}
                style={{
                  height: MAIN_CARD_H + MAIN_CARD_POKE,
                  bottom: -MAIN_CARD_H,
                  ...getFocusStyle(main.focus),
                }}
              />
            </div>

            <div
              className="rounded-3xl relative shadow-2xl overflow-hidden"
              style={{ height: MAIN_CARD_H }}
            >
              <div className="absolute inset-0 bg-white" />
              <img
                src={main.image}
                alt={main.name}
                className={`absolute bottom-0 right-0 object-cover pointer-events-none z-0 ${main.frameClass ?? "w-[60%]"} ${main.objectPositionClass ?? "object-bottom"}`}
                style={{ height: MAIN_CARD_H + MAIN_CARD_POKE, ...getFocusStyle(main.focus) }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative z-10 w-full md:w-[58%] p-10 lg:p-12 flex flex-col justify-center h-full"
                >
                  <span className="text-[#2E5BA8] text-6xl lg:text-7xl font-serif leading-none mb-4 block">
                    &ldquo;
                  </span>
                  <p className="text-[#0A1628] text-base lg:text-lg leading-relaxed mb-6">
                    {main.text}
                  </p>
                  <div className="w-10 h-0.5 bg-[#2E5BA8] mb-4" />
                  <p className="font-display text-[#0A1628] text-xl font-bold">{main.name}</p>
                  <p className="text-[#2E5BA8] text-sm">{main.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Columna derecha: Tarjetas Secundarias */}
          <div className="flex flex-col gap-6">
            {[secondary1, secondary2].map((t, i) => (
              <div
                key={i}
                className="flex-1 bg-white rounded-3xl relative overflow-hidden min-h-[210px] shadow-lg"
              >
                <div className="relative z-10 w-[58%] p-6 lg:p-8 flex flex-col justify-center h-full">
                  <span className="text-[#2E5BA8] text-3xl lg:text-4xl font-serif leading-none mb-2 block">
                    &ldquo;
                  </span>
                  <p className="text-[#0A1628] text-sm leading-relaxed mb-3 line-clamp-3">
                    {t.text}
                  </p>
                  <div className="w-8 h-0.5 bg-[#2E5BA8] mb-2" />
                  <p className="font-display text-[#0A1628] text-sm font-bold">{t.name}</p>
                  <p className="text-[#2E5BA8] text-xs">{t.role}</p>
                </div>
                <div className="absolute bottom-0 right-0 w-[45%] h-full flex items-center justify-center z-0">
                  <div className="w-28 h-28 rounded-full bg-blue-100/60 blur-xl absolute" />
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover object-top relative z-10 shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: tarjeta única con dots */}
        <div className="lg:hidden space-y-6">
          <div className="bg-white rounded-3xl relative overflow-hidden min-h-[400px] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative z-10 p-8"
              >
                <span className="text-[#2E5BA8] text-5xl font-serif leading-none mb-3 block">
                  &ldquo;
                </span>
                <p className="text-[#0A1628] text-sm leading-relaxed mb-6">
                  {main.text}
                </p>
                <div className="w-8 h-0.5 bg-[#2E5BA8] mb-3" />
                <p className="font-display text-[#0A1628] text-lg font-bold">{main.name}</p>
                <p className="text-[#2E5BA8] text-sm">{main.role}</p>
              </motion.div>
            </AnimatePresence>
            <div
              className={`absolute inset-y-0 right-0 pointer-events-none z-0 ${main.frameClass ?? "w-[60%]"}`}
            >
              <img
                src={main.image}
                alt={main.name}
                className={`w-full h-full object-cover ${main.objectPositionClass ?? "object-bottom"}`}
                style={getFocusStyle(main.focus)}
              />
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                  i === activeIndex ? "w-6 h-1.5 bg-white/20" : "w-1.5 h-1.5 bg-white/20"
                }`}
              >
                {i === activeIndex && (
                  <span
                    key={activeIndex}
                    className="absolute inset-y-0 left-0 bg-[#2E5BA8] rounded-full"
                    style={{
                      animation: isPaused ? "none" : "fillbar 5s linear",
                      width: isPaused ? "100%" : undefined,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
