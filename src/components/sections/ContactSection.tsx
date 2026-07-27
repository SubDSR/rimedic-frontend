import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.phone.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contacto" className="relative w-full overflow-hidden">
      <div
        className="relative min-h-[70vh] lg:min-h-[80vh] w-full bg-fixed bg-cover bg-center flex items-center justify-center px-4 py-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-[#0a192f]/75 backdrop-brightness-90" />

        <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          {submitted ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-8 rounded-2xl text-center max-w-lg mx-auto">
              <div className="w-14 h-14 bg-white text-[#0a192f] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">¡Solicitud recibida!</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Gracias, <span className="font-semibold">{formData.fullName}</span>. Te llamaremos
                al <span className="font-semibold">{formData.phone}</span> a la brevedad.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', phone: '' });
                }}
                className="mt-6 inline-block bg-white text-[#0a192f] text-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
                  Te llamamos
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-sm">
                  Déjanos tu nombre y teléfono y nos pondremos en contacto contigo para agendar tu
                  cita.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 mb-2"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Ej. +51 987 654 321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-[#0a192f] font-bold text-sm shadow-lg hover:bg-white/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Solicitar Llamada
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
