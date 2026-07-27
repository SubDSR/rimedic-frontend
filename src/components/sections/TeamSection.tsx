import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const TEAM_DATA = [
  {
    name: 'Lic. Sofía Mendoza',
    role: 'Enfermera Especialista',
    spec: 'Armonización Facial · Toxina Botulínica',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Lic. Valeria Chávez',
    role: 'Especialista en Aparatología',
    spec: 'HydraFacial · CO₂ Fraccionado · Láser',
    img: 'https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Lic. Andrea Torres',
    role: 'Cosmetóloga Clínica',
    spec: 'Tratamientos Corporales · Mesoterapia',
    img: 'https://images.unsplash.com/photo-1683348858689-f4e10994804d?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Dr. Ricardo Gálvez',
    role: 'Médico Estético',
    spec: 'Bioestimuladores · Plasma Rico en Plaquetas',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Lic. Carolina Paredes',
    role: 'Especialista en Laserterapia',
    spec: 'Depilación Láser · Rejuvenecimiento Fotónico',
    img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Dr. Miguel Ángel Ríos',
    role: 'Cirujano Plástico',
    spec: 'Lipotransferencia · Otoplastia · Blefaroplastia',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&auto=format',
  },
];

const AUTO_PLAY_MS = 4000;

export function TeamSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollNext = useCallback(() => {
    const el = carouselRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = (el.children[0] as HTMLElement).offsetWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const next = el.scrollLeft + cardWidth;
    if (next >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    const el = carouselRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = (el.children[0] as HTMLElement).offsetWidth;
    if (el.scrollLeft <= 10) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  }, []);

  // Auto-play: avanza cada 4s y se detiene si el usuario interactúa (hover, touch o drag manual del scroll)
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(scrollNext, AUTO_PLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, scrollNext]);

  return (
    <section className="bg-[#F4F7FB] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Encabezado: título a la izquierda, flechas junto al texto a la derecha */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] tracking-tight">
              Especialistas a tu servicio
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#1B2D4F]/45 text-sm max-w-xs leading-relaxed hidden sm:block">
              Profesionales certificados con las técnicas más avanzadas de medicina estética.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollPrev}
                aria-label="Anterior"
                className="p-2 rounded-full border border-[#0A1628]/10 hover:bg-[#0A1628]/5 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18L9 12L15 6" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Siguiente"
                className="p-2 rounded-full border border-[#0A1628]/10 hover:bg-[#0A1628]/5 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6L15 12L9 18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carrusel de una sola fila — nunca cae a una nueva línea */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TEAM_DATA.map((m, i) => (
            <div
              key={i}
              className={`shrink-0 min-w-0 snap-start flex ${
                i % 2 === 0 ? 'flex-col' : 'flex-col-reverse'
              } gap-2 basis-[85%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] xl:basis-[calc(25%-18px)]`}
            >
              <div className="overflow-hidden rounded-3xl bg-[#1B2D4F]">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-72 md:h-80 xl:h-96 object-cover object-top"
                />
              </div>

              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border border-[#0A1628]/[0.06] h-36 lg:h-40 overflow-hidden flex flex-col justify-center">
                <div className="text-[#2E5BA8] text-[10px] tracking-[0.28em] uppercase font-semibold mb-1.5 truncate">
                  {m.role}
                </div>
                <h3 className="font-display text-[#0A1628] text-xl font-bold mb-2 truncate">
                  {m.name}
                </h3>
                <p className="text-[#1B2D4F]/50 text-sm leading-relaxed line-clamp-2">{m.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
