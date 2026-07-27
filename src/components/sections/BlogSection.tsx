import { ArrowRight } from "lucide-react";
import { GoldLabel } from "@/components/ui/GoldLabel";
import { RevealDiv } from "@/components/ui/RevealDiv";
import { BLOG } from "@/data/constants";

export function BlogSection() {
  return (
    <section id="blog" className="bg-[#F4F7FB] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <RevealDiv className="mb-12">
          <GoldLabel>Blog & Actualidad</GoldLabel>
          <h2 className="font-display text-[#0A1628] text-3xl lg:text-4xl font-bold">
            Formación al <span className="text-[#2E5BA8]">nivel global</span>
          </h2>
        </RevealDiv>
        <div className="grid md:grid-cols-3 gap-px bg-[#0A1628]/[0.07]">
          {BLOG.map((post, i) => (
            <RevealDiv key={i} delay={i * 80}>
              <div className="group bg-white flex flex-col h-full overflow-hidden">
                <div className="relative h-44 overflow-hidden bg-[#F4F7FB]">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#2E5BA8] text-white text-[10px] tracking-widest uppercase px-3 py-1">
                    {post.tag}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[#2E5BA8] text-[11px] tracking-wider mb-2 uppercase">{post.date}</span>
                  <h3 className="font-display text-[#0A1628] text-[15px] font-bold leading-snug mb-2 group-hover:text-[#2E5BA8] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#1B2D4F]/55 text-[13px] leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-[#2E5BA8] text-xs">
                    Leer más <ArrowRight size={10} />
                  </div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
