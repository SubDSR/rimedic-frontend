import { useState, useEffect } from "react";
import { X, Phone, Facebook, Instagram, CheckCircle2 } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallModal({ isOpen, onClose }: CallModalProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setNombre("");
      setTelefono("");
      setError("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center transition-all transform scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2E5BA8] flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-[#1B2D4F] mb-2">¡Solicitud recibida!</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-[240px]">
              Gracias <span className="font-semibold text-gray-800">{nombre}</span>. Te llamaremos al <span className="font-semibold text-gray-800">{telefono}</span> a la brevedad.
            </p>
            <button
              onClick={onClose}
              className="bg-[#2E5BA8] hover:bg-[#1B2D4F] text-white px-8 py-2.5 rounded-full font-medium text-sm transition-colors cursor-pointer shadow-md"
            >
              Entendido
            </button>
          </div>
        ) : (
          <>
            {/* Top Phone Circle Icon */}
            <div className="w-16 h-16 rounded-full bg-[#2E5BA8] text-white flex items-center justify-center mb-4 shadow-md">
              <Phone size={28} className="fill-current stroke-none" />
            </div>

            {/* Social / Intro Text */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 mb-2">
              <Facebook size={14} className="text-gray-800" />
              <Instagram size={14} className="text-gray-800" />
              <span>Déjanos tus datos y nos comunicaremos contigo.</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2D4F] mb-6 tracking-tight">
              ¡Te llamamos!
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#2E5BA8] focus:ring-2 focus:ring-[#2E5BA8]/20 text-[#0A1628] placeholder-gray-400 transition-all bg-white"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#2E5BA8] focus:ring-2 focus:ring-[#2E5BA8]/20 text-[#0A1628] placeholder-gray-400 transition-all bg-white"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 font-medium text-center">{error}</p>
              )}

              <div className="mt-3">
                <button
                  type="submit"
                  className="bg-[#2E5BA8] hover:bg-[#1B2D4F] text-white font-medium py-2.5 px-8 rounded-full transition-all duration-200 text-sm shadow-md cursor-pointer inline-block"
                >
                  Llámenme
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
