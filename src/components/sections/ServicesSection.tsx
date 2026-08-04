import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Feature {
  title: string;
  image: string;
}

interface ServiceTab {
  id: string;
  label: string;
  title: string;
  description: string;
  features: Feature[];
}

// Contenido propio de esta sección (tabs animados de la home).
// No confundir con SERVICES_DATA de src/data/constants.ts, que alimenta
// las páginas de categoría (ServicesView) con otra estructura (antes/después).
const HOME_SERVICE_TABS: ServiceTab[] = [
  {
    id: 'medicina-estetica',
    label: 'Medicina estética',
    title: 'Rejuvenecimiento Facial',
    description:
      'Tratamientos no invasivos con toxina botulínica, ácido hialurónico y bioestimuladores para un rostro fresco y natural.',
    features: [
      {
        title: 'Toxina Botulínica',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Ácido Hialurónico',
        image: 'https://images.unsplash.com/photo-1552256031-811fa8f0a7b1?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Hilos Tensores',
        image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Bioestimuladores',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600&h=800',
      },
    ],
  },
  {
    id: 'aparatologias',
    label: 'Aparatologías',
    title: 'Tecnología Estética',
    description:
      'Equipos de última generación para remodelación corporal, reafirmación y regeneración cutánea profunda.',
    features: [
      {
        title: 'Criolipólisis',
        image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Radiofrecuencia',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Ultrasonido',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Presoterapia',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600&h=800',
      },
    ],
  },
  {
    id: 'limpieza-vitalidad',
    label: 'Limpieza y Vitalidad',
    title: 'Higienización Facial',
    description:
      'Limpieza profunda, exfoliación clínica e hidratación intensiva para una piel luminosa y saludable.',
    features: [
      {
        title: 'Limpieza Profunda',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Exfoliación Clínica',
        image: 'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Oxigenación',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600&h=800',
      },
      {
        title: 'Mascarillas',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=600&h=800',
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
};

export function ServicesSection() {
  const [activeTabId, setActiveTabId] = useState<string>(HOME_SERVICE_TABS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const width = useTransform(scrollYProgress, [0, 1], ['92%', '100%']);

  const activeTab = HOME_SERVICE_TABS.find((tab) => tab.id === activeTabId) || HOME_SERVICE_TABS[0];
  const isFirstTabActive = activeTabId === HOME_SERVICE_TABS[0].id;

  return (
    <section ref={containerRef} id="servicios" className="relative h-[110vh] w-full bg-white">
      <div className="sticky top-0 h-full w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius, width }}
          className="h-full w-full bg-gradient-to-b from-[#0a192f] via-[#0b1b3d] to-[#071326] text-white shadow-2xl flex flex-col overflow-y-auto px-4 py-6 sm:py-8 sm:px-10 lg:px-16"
        >
          {/* Wrapper centrado vertical y horizontalmente */}
          <div className="max-w-6xl mx-auto w-full my-auto">

            {/* Header */}
            <div className="w-full text-center mb-8 sm:mb-10">
              <span className="inline-block text-[#0a192f] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full bg-white shadow-sm mb-3">
                Servicios
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Tratamientos Especializados
              </h2>
            </div>

            {/* Folder: Tabs + Content Card */}
            <div className="w-full flex flex-col mb-4">

              {/* Tab Bar */}
              <div className="flex items-end gap-0 pl-0 mb-0 z-20 relative overflow-x-auto no-scrollbar">
                {HOME_SERVICE_TABS.map((tab, idx) => {
                  const isActive = tab.id === activeTabId;
                  const isFirst = idx === 0;

                  let tabClasses =
                    'relative z-10 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold transition-all duration-200 focus:outline-none whitespace-nowrap mb-0 select-none border-t border-x border-b-0 border-transparent ';

                  if (isActive) {
                    tabClasses += 'bg-white text-[#0a192f] shadow-none -mb-px ';
                    tabClasses += 'rounded-t-[2rem] rounded-b-none ';
                    if (isFirst) {
                      tabClasses += 'rounded-bl-none ';
                    }
                  } else {
                    tabClasses +=
                      'bg-transparent text-blue-100/80 hover:text-white hover:bg-white/10 rounded-t-[2rem] rounded-b-none ';
                  }

                  if (!isActive) {
                    tabClasses += 'border-r-0 last:border-r-0 ';
                  }

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={tabClasses}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* White Content Card */}
              <div
                className={`bg-white text-[#0a192f] shadow-2xl p-6 sm:p-8 lg:p-10 relative z-0 -mt-px ${
                  isFirstTabActive
                    ? 'rounded-b-[2rem] rounded-tr-[2rem] rounded-tl-none'
                    : 'rounded-[2rem]'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                  >
                    {/* Descripción de categoría */}
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mb-1">
                        {activeTab.title}
                      </h3>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
                        {activeTab.description}
                      </p>
                    </div>

                    {/* Grid de 4 columnas con imagen */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {activeTab.features.map((feature, i) => (
                        <motion.div
                          key={feature.title}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          className="group relative overflow-hidden rounded-2xl cursor-default"
                          style={{ aspectRatio: '3/4' }}
                        >
                          {/* Foto */}
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* Gradient oscuro permanente */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                          {/* Overlay inferior marrón/dorado — nombre centrado */}
                          <div
                            className="absolute bottom-4 left-0 right-0 flex items-center justify-center py-4 px-4"
                            style={{ background: 'rgba(139, 111, 71, 0.85)' }}
                          >
                            <p
                              className="text-white text-lg sm:text-xl text-center leading-tight"
                              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, letterSpacing: '0.08em' }}
                            >
                              {feature.title}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
