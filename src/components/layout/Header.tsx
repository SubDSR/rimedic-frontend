import { useEffect, useRef, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { StoreIcon } from "@/components/ui/StoreIcon";
import logoImg from "@/assets/images/logo.webp";
import { NAV_ITEMS } from "@/data/constants";
import type { PageView } from "@/types";

interface HeaderProps {
  onNav: (v: PageView) => void;
}

export function Header({ onNav }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const goHome = () => {
    onNav("home");
    window.scrollTo({ top: 0 });
  };

  const goToSection = (id: string) => {
    setMobileOpen(false);
    onNav("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const handleNavItem = (item: (typeof NAV_ITEMS)[0]) => {
    setMobileOpen(false);
    if (item.cat) {
      onNav(item.cat);
      window.scrollTo({ top: 0 });
    } else {
      goToSection("hero");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Barra superior */}
      <div className="bg-[#1B2D4F] hidden sm:block">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-10 flex items-center justify-end">
          <button
            onClick={() => goToSection("blog")}
            className="text-white hover:text-white text-sm tracking-wide transition-colors"
          >
            Blog
          </button>
        </div>
      </div>

      {/* Barra principal */}
      <div className="bg-white border-b border-[#0A1628]/[0.06]">
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 h-20 sm:h-20 flex items-center gap-4">
          {/* Hamburguesa mobile */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="relative z-10 lg:hidden text-[#0A1628] p-1 flex-shrink-0"
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Buscador */}
          <div className="relative z-10 hidden lg:flex items-center flex-1 max-w-xs">
            <div className="flex items-center w-full border border-[#0A1628]/12 bg-[#F4F7FB] rounded-full px-4 py-2.5">
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="¿Qué tratamiento buscas hoy?"
                className="bg-transparent text-[#0A1628] text-[13px] w-full outline-none placeholder-[#0A1628]/40"
              />
              <Search size={16} className="text-[#0A1628]/40 flex-shrink-0" />
            </div>
          </div>

          {/* Logo, siempre centrado respecto a la página entera (posición
              absoluta) independientemente del ancho del buscador o Sedes */}
          <button
            onClick={goHome}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <ImageWithFallback
              src={logoImg}
              alt="Rimedic — Medicina Estética"
              className="h-14 sm:h-25 w-auto object-contain"
            />
          </button>

          {/* Sedes */}
          <div className="relative z-10 hidden lg:flex items-center justify-end flex-1 max-w-xs ml-auto">
            <button
              onClick={() => goToSection("sedes")}
              className="flex items-center gap-2 text-[#0A1628] hover:text-[#2E5BA8] text-[20px] font-medium transition-colors"
            >
              <StoreIcon size={25} />
              Sedes
            </button>
          </div>

          {/* Ícono búsqueda mobile (compacto) */}
          <button
            onClick={() => inputRef.current?.focus()}
            className="relative z-10 lg:hidden ml-auto text-[#0A1628] p-1"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Barra inferior de navegación */}
      <div className="bg-[#1B2D4F] hidden lg:block">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <nav className="flex items-center justify-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavItem(item)}
                className="text-sm text-white hover:text-white px-5 py-3 transition-colors border-b-2 border-transparent hover:border-[#5B9BD5]"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Menú mobile (hamburguesa): buscador + nav + sedes + blog */}
      <div
        className={`lg:hidden bg-white border-t border-[#0A1628]/10 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex items-center border border-[#0A1628]/12 bg-[#F4F7FB] rounded-full px-4 py-2.5">
            <input
              ref={inputRef}
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="¿Qué tratamiento buscas hoy?"
              className="bg-transparent text-[#0A1628] text-sm w-full outline-none placeholder-[#0A1628]/40"
            />
            <Search size={16} className="text-[#0A1628]/40" />
          </div>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavItem(item)}
              className="text-left text-[#0A1628]/80 hover:text-[#2E5BA8] text-sm py-2 border-b border-[#0A1628]/[0.08]"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => goToSection("sedes")}
            className="flex items-center gap-2 text-left text-[#0A1628]/80 hover:text-[#2E5BA8] text-base py-2 border-b border-[#0A1628]/[0.08]"
          >
            <StoreIcon size={17} />
            Sedes
          </button>
          <button
            onClick={() => goToSection("blog")}
            className="text-left text-[#0A1628]/80 hover:text-[#2E5BA8] text-sm py-2"
          >
            Blog
          </button>
        </div>
      </div>
    </header>
  );
}
