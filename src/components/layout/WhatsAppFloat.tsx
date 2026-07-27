import { MessageCircle } from "lucide-react";
import { wa } from "@/data/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={wa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agenda tu cita por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white px-4 lg:px-5 py-3.5 rounded-full shadow-xl shadow-black/25 hover:shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-all duration-200 group"
    >
      <MessageCircle size={21} className="flex-shrink-0" />
      <span className="hidden lg:block text-sm font-medium whitespace-nowrap pr-1">
        Agenda tu cita aquí
      </span>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </a>
  );
}
