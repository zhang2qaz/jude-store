/**
 * JUDE Home Page — Concept 3 Style
 * ================================
 * Design: Warm, vibrant, NYC-inspired
 * Colors: Olive green, vermillion red, cream, cornflower blue, orange, salmon
 * Typography: Noto Serif Display (display), DM Sans (body), DM Mono (accents)
 * Tagline: "your life, styled"
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCT } from "@/lib/product";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      {/* Hero Section — Phase 2 minimal editorial style */}
      <section className="relative overflow-hidden bg-[#ECE9E7]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p className="font-display text-[20vw] leading-none text-white/70 tracking-[-0.04em]">
            graffiti
          </p>
        </div>
        <div className="container relative z-10 py-16 md:py-24 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 md:mb-14"
          >
            <p className="font-display lowercase text-[clamp(1.35rem,3.2vw,3rem)] text-[#1E1E1E]/82 tracking-[0.02em] leading-[1.45]">
              refrigerators, washers, and dryers
            </p>
            <p className="font-display lowercase text-[clamp(1.35rem,3.2vw,3rem)] text-[#C87854] tracking-[0.05em] leading-[1.55] mt-1">
              designed for{" "}
              <span className="underline decoration-[#C87854]/70 underline-offset-6">your actual life</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-display text-3xl md:text-4xl text-[#1E1E1E] mb-2">jude</p>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-[#6B6358] mb-10">
              Premium Lifestyle Appliance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="max-w-md mx-auto mb-10"
          >
            <img
              src={PRODUCT.colors[4].image}
              alt="jude Summer 2026 Edition"
              className="w-full h-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.25)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
          >
            <p className="font-display text-5xl md:text-6xl text-[#1E1E1E] mb-8">summer 2026</p>
            <Link href="/product">
              <span className="jude-btn-outline">
                Explore Collection <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Statement — Cornflower Blue */}
      <section className="bg-[#6B8CDB] grain-overlay">
        <div className="container relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-snug text-[#F5EDE0]">
              We celebrate the uniqueness of every home by crafting appliances that empower
              personal style and reflect individuality.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="font-display text-lg text-[#F5EDE0]/70">jude</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color Showcase — Cream background */}
      <section className="bg-[#F5EDE0]">
        <div className="container py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-4">
              Express Yourself
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-[#1E1E1E]">
              Nine Colors. Your Choice.
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {PRODUCT.colors.slice(0, 5).map((color, i) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href="/product">
                  <div className="group cursor-pointer jude-hover-card">
                    <div className="relative bg-[#FFFBF5] rounded-lg p-4 mb-3 overflow-hidden aspect-[3/4] flex items-center justify-center border border-[#D9CFC2] group-hover:border-[#D93A1D] transition-colors">
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#1E1E1E] text-[#F5EDE0] text-[10px] px-2 py-1 font-mono-brand tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Quick View
                      </span>
                    </div>
                    <p className="font-body text-xs text-center text-[#6B6358]">{color.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/product">
              <span className="inline-flex items-center gap-2 font-mono-brand text-xs tracking-widest uppercase text-[#D93A1D] hover:text-[#C0311A] transition-colors">
                View All Colors <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Values — Vermillion Red */}
      <section className="bg-[#D93A1D] grain-overlay">
        <div className="container relative z-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { label: "Adaptable", desc: "Effortlessly integrating into different homes and evolving lifestyles." },
              { label: "Expressive", desc: "Celebrating NYC creativity, empowering self-expression through design." },
              { label: "Joyful", desc: "Playful yet refined details that bring positivity and emotional resonance." },
              { label: "Thoughtful", desc: "Intentional, deliberate design and craftsmanship in every detail." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="font-display text-2xl font-medium text-[#F5EDE0] mb-3">{item.label}</h3>
                <p className="font-body text-sm text-[#F5EDE0]/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — Orange gradient */}
      <section className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] grain-overlay">
        <div className="container relative z-10 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-medium text-[#F5EDE0] mb-6">
              Ready to Style Your Kitchen?
            </h2>
            <p className="font-body text-lg text-[#F5EDE0]/80 mb-10 max-w-lg mx-auto">
              The jude French 4-Door Retro Refrigerator. Starting at $49,999.
            </p>
            <Link href="/product">
              <span className="inline-flex items-center gap-3 bg-[#F5EDE0] text-[#1E1E1E] px-10 py-4 font-body text-sm tracking-wider uppercase hover:bg-white transition-all duration-300 hover:-translate-y-0.5">
                Shop Now <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
