import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { CallModal } from "@/components/layout/CallModal";
import { StoreIcon } from "@/components/ui/StoreIcon";
import logoImg from "@/assets/images/logo.webp";
import { NAV_ITEMS } from "@/data/constants";
import type { PageView, NavItem } from "@/types";

interface HeaderProps {
  onNav: (v: PageView) => void;
}

export function Header({ onNav }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
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

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    if (item.cat) {
      onNav(item.cat);
      window.scrollTo({ top: 0 });
    } else if (item.action) {
      goToSection(item.action);
    } else {
      goHome();
    }
  };


  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-[#0A1628]/[0.06]">
        {/* Barra principal superior */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          {/* Lado Izquierdo: Menú Hamburguesa (Mobile) + Logo posicionado a un costado */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden text-[#0A1628] p-1 flex-shrink-0 cursor-pointer"
              aria-label="Menú"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo a un costado (izquierda) */}
            <button
              onClick={goHome}
              className="flex items-center flex-shrink-0 cursor-pointer"
            >
              <ImageWithFallback
                src={logoImg}
                alt="Rimedic — Medicina Estética"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </button>
          </div>

          {/* Lado Derecho: Botón ¡Te llamamos! (Azul) + Buscador + Carrito (Azul) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Botón ¡Te llamamos! (Azul del proyecto) */}
            <button
              onClick={() => setCallModalOpen(true)}
              className="bg-[#2E5BA8] hover:bg-[#1B2D4F] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              ¡Te Llamamos!
            </button>

            {/* Buscador */}
            <div className="relative hidden md:flex items-center border border-[#0A1628]/12 bg-[#F4F7FB] rounded-full px-3.5 py-2 text-xs sm:text-sm w-44 sm:w-56 focus-within:border-[#2E5BA8] focus-within:bg-white transition-all">
              <input
                ref={inputRef}
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="¿Qué tratamiento buscas?"
                className="bg-transparent text-[#0A1628] text-xs sm:text-sm w-full outline-none placeholder-[#0A1628]/40"
              />
              <Search size={16} className="text-[#0A1628]/40 flex-shrink-0" />
            </div>

            {/* Ícono Sedes con contador 0 (Azul) */}
            <button
              onClick={() => goToSection("sedes")}
              className="relative text-[#0A1628] hover:text-[#2E5BA8] p-1.5 transition-colors cursor-pointer"
              aria-label="Sedes"
            >
              <StoreIcon size={24} />
            </button>
          </div>
        </div>

        {/* Barra inferior de navegación desktop con categorías y submenús */}
        <div className="bg-[#1B2D4F] hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <nav className="flex items-center justify-center gap-2">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-sm text-white hover:text-white px-5 py-3 font-medium transition-colors border-b-2 border-transparent hover:border-[#5B9BD5] flex items-center gap-1.5 cursor-pointer"
                  >
                    {item.label}
                    {item.subItems && (
                      <ChevronDown
                        size={14}
                        className="opacity-70 group-hover:rotate-180 transition-transform duration-200"
                      />
                    )}
                  </button>

                  {/* Dropdown de Sub-items desplegable en hover */}
                  {item.subItems && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-1 z-50 min-w-[240px] animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleNavClick(item)}
                            className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:text-[#2E5BA8] hover:bg-slate-50 transition-colors block"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Menú mobile (hamburguesa) */}
        <div
          className={`lg:hidden bg-white border-t border-[#0A1628]/10 overflow-y-auto transition-all duration-300 ${mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-5 py-4 flex flex-col gap-3">
            {/* Buscador Mobile */}
            <div className="flex items-center border border-[#0A1628]/12 bg-[#F4F7FB] rounded-full px-4 py-2.5">
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="¿Qué tratamiento buscas?"
                className="bg-transparent text-[#0A1628] text-sm w-full outline-none placeholder-[#0A1628]/40"
              />
              <Search size={16} className="text-[#0A1628]/40" />
            </div>

            {/* Categorías y links Mobile */}
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-[#0A1628]/[0.08]">
                <div className="flex items-center justify-between py-2.5">
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-left text-[#0A1628]/90 font-medium hover:text-[#2E5BA8] text-sm flex-1"
                  >
                    {item.label}
                  </button>

                  {item.subItems && (
                    <button
                      onClick={() =>
                        setMobileExpandedCat((prev) => (prev === item.label ? null : item.label))
                      }
                      className="p-1 text-gray-500 hover:text-[#2E5BA8]"
                      aria-label="Expandir submenú"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${mobileExpandedCat === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  )}
                </div>

                {/* Subcategorías Mobile */}
                {item.subItems && mobileExpandedCat === item.label && (
                  <div className="pl-4 pb-2 flex flex-col gap-1.5 bg-slate-50 rounded-lg p-2 mb-2">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleNavClick(item)}
                        className="text-left text-xs text-gray-600 hover:text-[#2E5BA8] py-1"
                      >
                        • {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Botón Te Llamamos Mobile (Azul) */}
            <button
              onClick={() => {
                setMobileOpen(false);
                setCallModalOpen(true);
              }}
              className="bg-[#2E5BA8] hover:bg-[#1B2D4F] text-white text-center py-2.5 rounded-full text-sm font-medium mt-2 transition-colors cursor-pointer"
            >
              ¡Te Llamamos!
            </button>
          </div>
        </div>
      </header>

      {/* Modal Te Llamamos */}
      <CallModal isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
}
