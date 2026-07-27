import financingPlaceholder from "@/assets/images/financing-bar-placeholder.png";

export function FinancingBar() {
  return (
    <section className="bg-white pt-4 lg:pt-6">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Mismo ancho que el Hero (max-w-7xl), altura fija y mucho menor.
            object-cover + object-center centra y recorta si suben una imagen
            más grande que el contenedor. */}
        <div className="relative w-full h-9 sm:h-11 rounded-full overflow-hidden bg-[#0A1628]">
          <img
            src={financingPlaceholder}
            alt="Financiamiento — Rimedic"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
