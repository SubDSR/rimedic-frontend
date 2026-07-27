import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface ServiceTab {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  features: Feature[];
}

const SERVICES_DATA: ServiceTab[] = [
  {
    id: 'medicina-estetica',
    label: 'Medicina estética',
    title: 'Rejuvenecimiento Facial',
    description:
      'Tratamientos no invasivos con toxina botulínica, ácido hialurónico y bioestimuladores para un rostro fresco y natural.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Toxina Botulínica', description: 'Suaviza arrugas de expresión' },
      { title: 'Ácido Hialurónico', description: 'Restaura volumen y firmeza' },
      { title: 'Hilos Tensores', description: 'Reafirma sin cirugía' },
      { title: 'Bioestimuladores', description: 'Activa el colágeno natural' },
    ],
  },
  {
    id: 'aparatologias',
    label: 'Aparatologías',
    title: 'Tecnología Estética',
    description:
      'Equipos de última generación para remodelación corporal, reafirmación y regeneración cutánea profunda.',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Criolipólisis', description: 'Elimina grasa localizada' },
      { title: 'Radiofrecuencia', description: 'Reafirma y tensa la piel' },
      { title: 'Ultrasonido', description: 'Redefine el contorno corporal' },
      { title: 'Presoterapia', description: 'Drena y desintoxica' },
    ],
  },
  {
    id: 'limpieza-vitalidad',
    label: 'Limpieza y Vitalidad',
    title: 'Higienización Facial',
    description:
      'Limpieza profunda, exfoliación clínica e hidratación intensiva para una piel luminosa y saludable.',
    image:
      'https://images.unsplash.com/photo-1512290900673-00e95a0a3962?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Limpieza Profunda', description: 'Elimina impurezas y puntos negros' },
      { title: 'Exfoliación Clínica', description: 'Renueva la superficie cutánea' },
      { title: 'Oxigenación', description: 'Nutre y revitaliza la piel' },
      { title: 'Mascarillas', description: 'Según tu tipo de piel' },
    ],
  },
];

export function ServicesSection() {
  const [activeTabId, setActiveTabId] = useState<string>(SERVICES_DATA[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const width = useTransform(scrollYProgress, [0, 1], ['92%', '100%']);

  const activeTab = SERVICES_DATA.find((tab) => tab.id === activeTabId) || SERVICES_DATA[0];
  const isFirstTabActive = activeTabId === SERVICES_DATA[0].id;

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

            {/* Folder: Tabs + White Card */}
            <div className="w-full flex flex-col mb-4">
            {/* Tab Bar */}
            <div className="flex items-end gap-0 sm:gap-0 pl-0 sm:pl-0 mb-0 z-20 relative overflow-x-auto no-scrollbar">
              {SERVICES_DATA.map((tab, idx) => {
                const isActive = tab.id === activeTabId;
                const isFirst = idx === 0;

                let tabClasses =
                  'relative z-10 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold transition-all duration-200 focus:outline-none whitespace-nowrap mb-0 select-none border-t border-x border-b-0 border-transparent ';

                if (isActive) {
                  tabClasses += 'bg-white text-[#0a192f] shadow-none -mb-px ';
                  tabClasses += 'rounded-t-[2rem] rounded-b-none ';
                  // If first tab is active, also remove bottom-left radius so it fits flush
                  if (isFirst) {
                    tabClasses += 'rounded-bl-none ';
                  }
                } else {
                  tabClasses +=
                    'bg-transparent text-blue-100/80 hover:text-white hover:bg-white/10 rounded-t-[2rem] rounded-b-none ';
                }

                // Border-right: only between tabs, not after the last one
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
              className={`bg-white text-[#0a192f] shadow-2xl p-6 sm:p-10 lg:p-12 relative z-0 -mt-px ${
                isFirstTabActive
                  ? 'rounded-b-[2rem] rounded-tr-[2rem] rounded-tl-none'
                  : 'rounded-[2rem]'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  {/* Left: Image */}
                  <div className="relative group overflow-hidden rounded-2xl lg:rounded-3xl border border-slate-200 shadow-lg bg-slate-100">
                    <img
                      src={activeTab.image}
                      alt={activeTab.title}
                      className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Right: Title + Description + Features Grid */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a192f] mb-4 leading-tight">
                      {activeTab.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                      {activeTab.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeTab.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-blue-50"
                        >
                          <div className="p-1 rounded-md bg-blue-600 text-white shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#0a192f]">
                              {feature.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-snug">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
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
