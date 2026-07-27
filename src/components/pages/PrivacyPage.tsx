import { ChevronLeft, Shield, Lock, FileText, CheckCircle } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { LegalAccordion, type LegalSection } from "@/components/ui/LegalAccordion";

interface PrivacyPageProps {
  onBack: () => void;
}

const SECTIONS: LegalSection[] = [
  { title: "1. Responsable del Tratamiento", icon: <Shield size={15} />, body: "Rimedic, con domicilio en Av. Del Ejército 670, Miraflores, Lima, Perú, es responsable del tratamiento de los datos personales que nos proporcione. Para consultas sobre privacidad contáctenos en contacto@rimedic.com o WhatsApp: +51 946 795 583." },
  { title: "2. Datos que Recopilamos", icon: <FileText size={15} />, body: "Recopilamos únicamente los datos necesarios:\n• Nombre completo\n• Número de teléfono / WhatsApp\n• Información médica relevante para el tratamiento\n• Fotografías clínicas (con consentimiento expreso)\n\nNo recopilamos datos bancarios a través de este sitio web." },
  { title: "3. Finalidad del Tratamiento", icon: <Lock size={15} />, body: "Los datos recopilados se utilizan exclusivamente para:\n• Gestionar citas y reservas\n• Proporcionar atención médica personalizada\n• Enviar información sobre servicios (solo si lo solicita)\n• Cumplir con obligaciones legales y médicas\n\nNo vendemos sus datos a terceros." },
  { title: "4. Base Legal", icon: <Shield size={15} />, body: "El tratamiento de sus datos se realiza bajo:\n• Consentimiento expreso del titular\n• Cumplimiento de obligaciones contractuales\n• Cumplimiento de la Ley N° 29733 (Ley de Protección de Datos Personales del Perú)" },
  { title: "5. Almacenamiento y Seguridad", icon: <Lock size={15} />, body: "Sus datos y registros clínicos se almacenan con medidas de seguridad técnicas y organizativas adecuadas. El acceso está restringido únicamente al personal médico y administrativo directamente involucrado en su atención." },
  { title: "6. Sus Derechos", icon: <CheckCircle size={15} />, body: "Como titular de sus datos, usted tiene derecho a:\n• Acceso: conocer qué datos tenemos\n• Rectificación: corregir datos inexactos\n• Cancelación: solicitar la eliminación\n• Oposición: oponerse al tratamiento\n\nPara ejercerlos: contacto@rimedic.com o WhatsApp: +51 946 795 583." },
  { title: "7. Cambios en la Política", icon: <FileText size={15} />, body: "Rimedic se reserva el derecho de modificar esta Política de Privacidad. Los cambios serán publicados en este sitio. El uso continuado de nuestros servicios implica la aceptación de los cambios publicados." },
];

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F4F7FB] border-b border-[#0A1628]/[0.07] py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <GoldLabel>Legal</GoldLabel>
          <h1 className="font-display text-[#0A1628] text-4xl font-bold">Política de Privacidad</h1>
          <p className="text-[#0A1628]/40 text-sm mt-2">Última actualización: julio 2025</p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-b border-[#0A1628]/[0.07] bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-10 py-8">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Shield size={20} />, label: "Datos Protegidos", sub: "Ley N° 29733" },
              { icon: <Lock size={20} />, label: "Acceso Restringido", sub: "Solo personal autorizado" },
              { icon: <CheckCircle size={20} />, label: "Sin Ventas", sub: "No cedemos tus datos" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 py-5 px-3 border border-[#0A1628]/[0.09] bg-[#F4F7FB]">
                <span className="text-[#C9A96E]">{item.icon}</span>
                <div className="text-[#0A1628] text-[13px] font-medium">{item.label}</div>
                <div className="text-[#0A1628]/40 text-[11px]">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-12">
        <LegalAccordion sections={SECTIONS} maxHeight="500px" />
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
