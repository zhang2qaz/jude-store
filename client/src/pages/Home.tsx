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

      {/* Hero Section — Olive Green background with large serif tagline */}
      <section className="relative bg-[#A3A800] overflow-hidden grain-overlay">
        <div className="container relative z-10 py-14 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#1E1E1E]/60 mb-6">
                jude premium appliances
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] md:leading-[0.95] mb-6 md:mb-8">
                <span className="text-[#4A3520]">your </span>
                <span className="text-[#D4917F]">life, </span>
                <br />
                <span className="text-[#F5EDE0]">styled</span>
              </h1>
              <p className="font-body text-sm md:text-lg text-[#1E1E1E]/75 max-w-md mb-7 md:mb-10 leading-relaxed">
                508L capacity, 9 signature color finishes, and white-glove delivery support.
                Built for customers who want statement design with premium everyday performance.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Link href="/product">
                  <span className="jude-btn-primary w-full sm:w-auto">
                    Shop Refrigerator <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/orders">
                  <span className="jude-btn-outline border-[#4A3520] text-[#4A3520] hover:bg-[#4A3520] hover:text-[#F5EDE0] w-full sm:w-auto">
                    Track Existing Order
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right: Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-[#F5EDE0] rounded-lg p-6 md:p-10 shadow-2xl jude-hover-card">
                <img
                  src={PRODUCT.heroImage}
                  alt="jude French 4-Door Retro Refrigerator"
                  className="w-full h-auto object-contain max-h-[500px] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Statement — Cornflower Blue */}
      <section className="bg-[#6B8CDB] grain-overlay">
        <div className="container relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-snug text-[#F5EDE0]">
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
        <div className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-4">
              Express Yourself
            </p>
            <h2 className="font-display text-2xl md:text-5xl font-medium text-[#1E1E1E]">
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
        <div className="container relative z-10 py-16 md:py-24">
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

      {/* Delivery & Installation Support */}
      <section className="bg-[#FFFBF5] border-y border-[#D9CFC2]">
        <div className="container py-14 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-4">
                Delivery Clarity
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E] mb-4">
                Planning a NYC apartment delivery?
              </h2>
              <p className="font-body text-sm md:text-base text-[#6B6358] leading-relaxed max-w-xl">
                Review white-glove expectations, installation preparation, and measurement reminders
                before checkout. Built to reduce surprises for apartment, townhouse, and managed-building
                deliveries.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-[#F5EDE0] border border-[#D9CFC2] rounded-lg p-4">
                <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-1">
                  Before Delivery
                </p>
                <p className="font-body text-sm text-[#1E1E1E]">Measure entry path, turns, and elevator depth.</p>
              </div>
              <div className="bg-[#F5EDE0] border border-[#D9CFC2] rounded-lg p-4">
                <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-1">
                  Building Access
                </p>
                <p className="font-body text-sm text-[#1E1E1E]">Confirm service windows, loading dock, and approvals.</p>
              </div>
              <div className="bg-[#F5EDE0] border border-[#D9CFC2] rounded-lg p-4 sm:col-span-2">
                <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-1">
                  White-Glove Support
                </p>
                <p className="font-body text-sm text-[#1E1E1E]">
                  In-home placement, unboxing, and setup guidance with optional haul-away support.
                </p>
              </div>
              <div className="sm:col-span-2">
                <Link href="/delivery-installation">
                  <span className="jude-btn-outline border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-[#F5EDE0] w-full justify-center">
                    View Delivery & Installation Guide <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — Orange gradient */}
      <section className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] grain-overlay">
        <div className="container relative z-10 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl md:text-6xl font-medium text-[#F5EDE0] mb-5 md:mb-6">
              Ready to Style Your Kitchen?
            </h2>
            <p className="font-body text-base md:text-lg text-[#F5EDE0]/85 mb-8 md:mb-10 max-w-lg mx-auto">
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
