import type {
  ServiceCategory,
  Promotion,
  Credential,
  TeamMember,
  Testimonial,
  BlogPost,
  Sede,
  NavItem,
  PageView,
} from "@/types";
import corporal360Img from "@/assets/images/promos/corporal-360.webp";
import cuidadoPostTratamientoImg from "@/assets/images/promos/cuidado-post-tratamiento.png";
import limpiezaFacialImg from "@/assets/images/promos/limpieza-facial.jpg";
import promo4 from "@/assets/images/promos/promo-4-placeholder.webp";
import promo5 from "@/assets/images/promos/promo-5-placeholder.svg";

// Before / after image pairs
const BA = {
  b1: "https://images.unsplash.com/photo-1552256031-811fa8f0a7b1?w=600&h=600&fit=crop&auto=format",
  b2: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop&auto=format",
  b3: "https://images.unsplash.com/photo-1713085085470-fba013d67e65?w=600&h=600&fit=crop&auto=format",
  a1: "https://images.unsplash.com/photo-1581182800629-7d90925ad072?w=600&h=600&fit=crop&auto=format",
  a2: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=600&h=600&fit=crop&auto=format",
};

export const SERVICES_DATA: Record<string, ServiceCategory> = {
  medicina: {
    label: "Medicina Estética",
    desc: "Procedimientos de precisión con productos importados certificados para realzar tu belleza de forma natural y segura.",
    items: [
      { name: "Bótox", desc: "Suaviza líneas de expresión conservando tu naturalidad. Efecto visible desde los 3–7 días con duración de 4 a 6 meses.", before: BA.b1, after: BA.a1, msg: "Hola, me interesa el tratamiento de Bótox en Rimedic." },
      { name: "Rinomodelación con AH", desc: "Perfila y eleva el puente nasal sin cirugía. Resultado inmediato con duración de hasta 12 meses.", before: BA.b2, after: BA.a2, msg: "Hola, me interesa la Rinomodelación con Ácido Hialurónico." },
      { name: "Ácido Hialurónico", desc: "Rellena, volumiza y define labios, pómulos y mentón con resultados naturales de 12 a 18 meses.", before: BA.b3, after: BA.a1, msg: "Hola, me interesa el tratamiento de Ácido Hialurónico." },
      { name: "Bioestimulador de Colágeno", desc: "Estimula la producción natural de colágeno para tensar y rejuvenecer la piel desde adentro. Efecto hasta 2 años.", before: BA.b2, after: BA.a2, msg: "Hola, me interesa el Bioestimulador de Colágeno de Rimedic." },
      { name: "Hilos Tensores", desc: "Lifting facial no quirúrgico. Reposiciona tejidos caídos con resultados inmediatos y progresivos.", before: BA.b1, after: BA.a2, msg: "Hola, me interesa el tratamiento de Hilos Tensores." },
    ],
  },
  aparatologias: {
    label: "Aparatologías",
    desc: "Equipos de última generación con tecnología certificada para resultados profundos y medibles desde la primera sesión.",
    items: [
      { name: "HydraFacial", desc: "Limpieza profunda, exfoliación, extracción e hidratación en una sola sesión de 45 minutos. Resultados inmediatos.", before: BA.b3, after: BA.a1, msg: "Hola, me interesa el tratamiento de HydraFacial." },
      { name: "CO₂ Fraccionado", desc: "Resurfacing láser para manchas, cicatrices de acné, poros dilatados y rejuvenecimiento global de la piel.", before: BA.b2, after: BA.a2, msg: "Hola, me interesa el tratamiento de CO₂ Fraccionado." },
      { name: "Depilación Láser", desc: "Eliminación definitiva del vello no deseado con tecnología diodo, apta para todos los fototipos de piel.", before: BA.b1, after: BA.a1, msg: "Hola, me interesa la Depilación Láser en Rimedic." },
    ],
  },
  limpieza: {
    label: "Limpieza y Vitalidad",
    desc: "Tratamientos de bienestar y revitalización para una piel sana, luminosa y llena de energía.",
    items: [
      { name: "Limpieza Facial Profunda", desc: "Eliminación de impurezas, desobstrucción de poros y equilibrio sebáceo para una piel limpia e iluminada.", before: BA.b2, after: BA.a2, msg: "Hola, me interesa la Limpieza Facial Profunda." },
      { name: "Vitaminas IV", desc: "Cóctel vitamínico endovenoso personalizado para recargar energía, fortalecer el sistema inmune y aportar luminosidad.", before: BA.b1, after: BA.a1, msg: "Hola, me interesa el tratamiento de Vitaminas IV." },
      { name: "Mesoterapia Facial", desc: "Microinyecciones de vitaminas y ácido hialurónico para hidratar, nutrir y revitalizar la piel en profundidad.", before: BA.b3, after: BA.a2, msg: "Hola, me interesa la Mesoterapia Facial." },
      { name: "Peeling Químico", desc: "Renovación celular controlada para unificar el tono, suavizar arrugas finas y mejorar la textura cutánea.", before: BA.b2, after: BA.a1, msg: "Hola, me interesa el Peeling Químico en Rimedic." },
    ],
  },
};

export const PROMOTIONS: Promotion[] = [
  { img: corporal360Img, alt: "Promoción Corporal 360 — Rimedic", msg: "Hola, quisiera información sobre la promoción de tratamientos Corporal 360." },
  { img: cuidadoPostTratamientoImg, alt: "Promoción Cuidado Post-Tratamiento — Rimedic", msg: "Hola, quisiera información sobre los productos de cuidado post-tratamiento." },
  { img: limpiezaFacialImg, alt: "Promoción Limpieza Facial — Rimedic", msg: "Hola, quisiera información sobre los nuevos protocolos de Limpieza Facial." },
  { img: promo4, alt: "Promoción HydraFacial — Rimedic", msg: "Hola, quisiera información sobre la promoción de HydraFacial." },
  { img: promo5, alt: "Promoción Bioestimulador de Colágeno — Rimedic", msg: "Hola, quisiera información sobre el Bioestimulador de Colágeno." },
];

export const CREDENTIALS: Credential[] = [
  { flag: "🇫🇷", country: "París, Francia", event: "IMCAS World Congress 2025" },
  { flag: "🇰🇷", country: "Seúl, Corea del Sur", event: "ICLAS Conference 2025" },
  { flag: "🇦🇹", country: "Viena, Austria", event: "Fábrica Croma · Bioestimuladores" },
  { flag: "🇮🇹", country: "Verona, Italia", event: "Cadaver Lab · Técnicas Avanzadas" },
  { flag: "🇲🇽", country: "Ciudad de México", event: "Rotación Médica Especializada 2025" },
];

export const TEAM: TeamMember[] = [
  { name: "Lic. Sofía Mendoza", role: "Enfermera Especialista", spec: "Armonización Facial · Tóxina Botulínica", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&auto=format", msg: "Hola, quisiera información sobre los tratamientos con la Lic. Sofía Mendoza." },
  { name: "Lic. Valeria Chávez", role: "Especialista en Aparatología", spec: "HydraFacial · CO₂ Fraccionado · Láser", img: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=400&h=500&fit=crop&auto=format", msg: "Hola, quisiera información sobre los tratamientos con la Lic. Valeria Chávez." },
  { name: "Lic. Andrea Torres", role: "Cosmetóloga Clínica", spec: "Tratamientos Corporales · Mesoterapia · Skincare", img: "https://images.unsplash.com/photo-1683348858689-f4e10994804d?w=400&h=500&fit=crop&auto=format", msg: "Hola, quisiera información sobre los tratamientos con la Lic. Andrea Torres." },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Aida Martínez", role: "Artista & Presentadora", text: "El Dr. Rivera es increíble. Me realizó un tratamiento de armonización facial y los resultados fueron completamente naturales. Totalmente recomendado.", stars: 5, initials: "AM" },
  { name: "Érika Villalobos", role: "Actriz Peruana", text: "Equipo profesional, ambiente premium y resultados que superaron todas mis expectativas. Confié en Rimedic y no me arrepiento.", stars: 5, initials: "EV" },
  { name: "Carla Cueva", role: "Influencer & Modelo", text: "Llevo años siendo paciente del Dr. Brayan. Siempre prioriza la seguridad y la naturalidad. Sus productos son certificados internacionalmente.", stars: 5, initials: "CC" },
];

export const BLOG: BlogPost[] = [
  { tag: "Congresos", date: "Marzo 2025", title: "ICLAS Conference 2025 — Seúl, Corea del Sur", excerpt: "El Dr. Rivera participó en el congreso de medicina estética más importante de Asia, trayendo las últimas innovaciones.", img: "https://images.unsplash.com/photo-1631507623442-fee09e89c6a8?w=800&h=500&fit=crop&auto=format" },
  { tag: "Formación", date: "Febrero 2025", title: "Visita Fábrica Croma — Viena, Austria", excerpt: "Conocimos de primera mano el proceso de fabricación de los bioestimuladores de colágeno que utilizamos en Rimedic.", img: "https://images.unsplash.com/photo-1781513144825-aa1e284c5950?w=800&h=500&fit=crop&auto=format" },
  { tag: "Especialización", date: "Enero 2025", title: "Rotación Médica México 2025", excerpt: "Capacitación intensiva en técnicas avanzadas con especialistas de renombre en Ciudad de México.", img: "https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?w=800&h=500&fit=crop&auto=format" },
];

export const SEDES: Sede[] = [
  { name: "Sede Miraflores", address: "Av. Del Ejército 670, Miraflores", city: "Lima, Perú", phone: "+51 937-540-393", whatsapp: "946 795 583", hours: "Lun – Sáb · 09:30 – 21:00", mapSrc: "https://maps.google.com/maps?q=Av.+del+Ejercito+670,+Miraflores,+Lima,+Peru&output=embed&z=16" },
  { name: "Sede San Isidro", address: "Av. Conquistadores 456, San Isidro", city: "Lima, Perú", phone: "+51 937-540-393", whatsapp: "946 795 583", hours: "Lun – Sáb · 10:00 – 20:00", mapSrc: "https://maps.google.com/maps?q=Av.+Conquistadores,+San+Isidro,+Lima,+Peru&output=embed&z=16" },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Promociones", href: "#hero", action: "hero", cat: null },
  {
    label: "Medicina Estética",
    href: null,
    action: null,
    cat: "medicina" as PageView,
    subItems: [
      "Ácido hialurónico (rino, labios, glúteos, anclaje)",
      "Enzimas",
      "Bioestimuladores",
      "Botox",
      "Exosomas",
      "Polyphil (polinucleótidos)",
      "Ellansé",
      "Radiesse",
      "Jalupro",
      "Tratamiento de ojeras",
    ],
  },
  {
    label: "Aparatologías",
    href: null,
    action: null,
    cat: "aparatologias" as PageView,
    subItems: [
      "Exion",
      "Hydrafacial",
      "CO2 fraccionado",
      "Bodysculpt",
      "Depilación láser",
      "Radiofrecuencia",
    ],
  },
  {
    label: "Limpieza Profunda",
    href: null,
    action: null,
    cat: "limpieza" as PageView,
    subItems: [
      "Hydrafacial",
      "Vitamina C",
      "Cóctel de vida",
      "Mesoterapia facial",
      "PRP (plasma rico en plaquetas)",
      "Pink intimate",
    ],
  },
  { label: "Blog", href: null, action: "blog", cat: null },
];
