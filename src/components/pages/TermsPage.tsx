import { ChevronLeft, CheckCircle, CreditCard, Smartphone } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { LegalAccordion, type LegalSection } from "@/components/ui/LegalAccordion";

interface TermsPageProps {
  onBack: () => void;
}

const SECTIONS: LegalSection[] = [
  { title: "1. Aceptación de los Términos", body: "Al acceder y utilizar el sitio web de Rimedic (rimedic.com), usted acepta quedar vinculado por los presentes Términos y Condiciones. Si no está de acuerdo, le pedimos que no utilice nuestros servicios. Rimedic se reserva el derecho de modificar estos términos en cualquier momento." },
  { title: "2. Descripción del Servicio", body: "Rimedic es un centro de medicina estética ubicado en Av. Del Ejército 670, Miraflores, Lima, Perú. Ofrecemos procedimientos estéticos no invasivos y mínimamente invasivos, incluyendo armonización facial, tratamientos corporales, depilación láser y aparatología estética. Todos los procedimientos son realizados por personal médico y de salud debidamente certificado." },
  { title: "3. Uso del Sitio Web", body: "Este sitio web es de carácter informativo y no constituye asesoría médica. La información no reemplaza la consulta presencial con nuestros especialistas. Está prohibido el uso del sitio para fines ilícitos o cualquier actividad que pueda dañar los sistemas de Rimedic." },
  {
    title: "4. Reservas, Pagos y Cancelaciones",
    body: `Las citas se coordinan exclusivamente a través de WhatsApp (+51 946 795 583) o de manera presencial. No contamos con pasarela de pago en línea. Los pagos se realizan de forma presencial o coordinada vía WhatsApp.

Medios de pago aceptados:
• Efectivo (soles y dólares)
• Tarjetas de crédito: Visa, Mastercard, American Express, Diners Club
• Tarjetas de débito: BCP, BBVA
• Billeteras digitales: Yape, Plin
• Transferencias bancarias: BCP, BBVA

Las cancelaciones deben realizarse con mínimo 24 horas de anticipación. Inasistencias sin aviso previo podrán generar un cargo del 30% del costo del tratamiento reservado.`,
  },
  { title: "5. Responsabilidad Médica", body: "Rimedic garantiza que todos los procedimientos son realizados por profesionales de la salud con registro vigente (CMP). Los resultados pueden variar según las condiciones individuales de cada paciente. Es responsabilidad del paciente proporcionar información médica completa y veraz durante la consulta inicial." },
  { title: "6. Propiedad Intelectual", body: "Todo el contenido de este sitio web —textos, imágenes, logotipos, videos y diseño— es propiedad exclusiva de Rimedic y está protegido por las leyes de propiedad intelectual del Perú. Queda prohibida su reproducción sin autorización expresa." },
  { title: "7. Ley Aplicable", body: "Los presentes Términos y Condiciones se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a la jurisdicción de los tribunales competentes de Lima, Perú." },
];

const PAYMENT_METHODS = [
  { name: "Visa", icon: <CreditCard size={16} /> },
  { name: "Mastercard", icon: <CreditCard size={16} /> },
  { name: "Amex", icon: <CreditCard size={16} /> },
  { name: "Diners", icon: <CreditCard size={16} /> },
  { name: "BBVA", icon: <Smartphone size={16} /> },
  { name: "BCP", icon: <Smartphone size={16} /> },
  { name: "Yape", icon: <Smartphone size={16} /> },
  { name: "Plin", icon: <Smartphone size={16} /> },
];

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F4F7FB] border-b border-[#0A1628]/[0.07] py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <GoldLabel>Legal</GoldLabel>
          <h1 className="font-display text-[#0A1628] text-4xl font-bold">Términos y Condiciones</h1>
          <p className="text-[#0A1628]/40 text-sm mt-2">Última actualización: julio 2025</p>
        </div>
      </div>

      {/* Payment methods highlight */}
      <div className="border-b border-[#0A1628]/[0.07] bg-white py-10">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="flex items-start gap-3 mb-5">
            <CheckCircle size={17} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[#0A1628] font-medium text-sm">Medios de pago aceptados</div>
              <div className="text-[#0A1628]/45 text-xs mt-0.5">Los pagos se coordinan vía WhatsApp o de forma presencial. No contamos con pasarela de pago en línea.</div>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PAYMENT_METHODS.map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-1.5 bg-[#F4F7FB] border border-[#0A1628]/10 py-3 px-2">
                <span className="text-[#2E5BA8]">{m.icon}</span>
                <span className="text-[#0A1628]/50 text-[10px] text-center">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-12">
        <LegalAccordion sections={SECTIONS} />
        <div className="mt-10 text-center">
          <button onClick={onBack} className="inline-flex items-center gap-2 border border-[#0A1628]/20 hover:border-[#2E5BA8] text-[#0A1628]/60 hover:text-[#2E5BA8] text-sm px-6 py-3 transition-colors">
            <ChevronLeft size={14} />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
