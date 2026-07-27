import { Instagram, Facebook, MessageCircle, Mail } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import logoImg from "@/assets/images/logo.webp";
import { wa } from "@/data/whatsapp";
import type { PageView } from "@/types";

interface FooterProps {
  onNav: (v: PageView) => void;
}

export function Footer({ onNav }: FooterProps) {
  return (
    <footer className="bg-[#0a192f] pt-14 pb-0">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex items-start justify-center lg:justify-start">
            <div className="flex flex-col items-center">
              <ImageWithFallback src={logoImg} alt="Rimedic" className="h-28 w-auto object-contain mb-6 brightness-0 invert" />
              <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/rimedicperu/", label: "Instagram", icon: <Instagram size={16} /> },
                { href: "#", label: "Facebook", icon: <Facebook size={16} /> },
                { href: wa(), label: "WhatsApp", icon: <MessageCircle size={16} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-blue-200/50 hover:text-white transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          </div>

          {/* Tratamientos */}
          <div>
            <div className="text-white font-bold text-sm tracking-wider uppercase mb-4">Tratamientos</div>
            <div className="flex flex-col gap-2.5">
              {["Medicina Estética", "Aparatologías", "Limpieza y Vitalidad", "Corporales", "Depilación Láser"].map((s) => (
                <a key={s} href="#" className="text-blue-200/60 text-[13px] hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <div className="text-white font-bold text-sm tracking-wider uppercase mb-4">Empresa</div>
            <div className="flex flex-col gap-2.5">
              {["Sobre Rimedic", "El Doctor", "Blog", "Sedes", "Testimonios"].map((s) => (
                <a key={s} href="#" className="text-blue-200/60 text-[13px] hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contacto</div>
            <div className="flex flex-col gap-2.5">
              <div className="text-blue-200/60 text-[13px] leading-relaxed">Av. Del Ejército 670<br />Miraflores, Lima</div>
              <a href="tel:+51937540393" className="text-blue-200/60 text-[13px] hover:text-white transition-colors">+51 937-540-393</a>
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="text-blue-200/60 text-[13px] hover:text-white transition-colors">WhatsApp: 946 795 583</a>
              <a href="mailto:contacto@rimedic.com" className="text-blue-200/60 text-[13px] hover:text-white transition-colors flex items-center gap-1.5">
                <Mail size={11} />
                contacto@rimedic.com
              </a>
              <div className="text-blue-200/40 text-[12px]">Lun–Sáb · 09:30–21:00</div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800/50 pt-6 pb-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-blue-200/40">© 2025 Rimedic. Todos los derechos reservados.</div>
          <div className="flex gap-5">
            <button
              onClick={() => { onNav("terms"); window.scrollTo({ top: 0 }); }}
              className="text-blue-200/40 hover:text-white transition-colors"
            >
              Términos y Condiciones
            </button>
            <button
              onClick={() => { onNav("privacy"); window.scrollTo({ top: 0 }); }}
              className="text-blue-200/40 hover:text-white transition-colors"
            >
              Política de Privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
