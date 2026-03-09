import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container pt-6 pb-4">
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] hover:text-[#D93A1D] transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </span>
          </Link>
        </div>

        <section className="container pb-12">
          <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">About jude</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] mb-5">Designed for expressive homes.</h1>
          <p className="font-body text-sm md:text-base text-[#6B6358] max-w-3xl leading-relaxed">
            jude is a premium appliance label inspired by New York City individuality. We build statement
            refrigerators that balance design-forward form with dependable everyday performance.
          </p>
        </section>

        <section className="bg-[#FFFBF5] border-y border-[#D9CFC2] py-14 md:py-16">
          <div className="container grid md:grid-cols-3 gap-5">
            <div className="border border-[#D9CFC2] rounded-lg p-5">
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Design Language</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                Vintage silhouettes, bold color stories, and curated details that anchor modern kitchens.
              </p>
            </div>
            <div className="border border-[#D9CFC2] rounded-lg p-5">
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Performance First</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                High-capacity storage, stable cooling, and low-noise operation engineered for real homes.
              </p>
            </div>
            <div className="border border-[#D9CFC2] rounded-lg p-5">
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Service Commitment</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                White-glove delivery support, proactive communication, and responsive owner assistance.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] rounded-lg p-7 md:p-8 text-[#F5EDE0]">
            <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#F5EDE0]/80 mb-2">
              Continue Exploring
            </p>
            <h3 className="font-display text-3xl mb-3">Need product, delivery, or support details?</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/product">
                <span className="jude-btn-primary">
                  Shop Product <ArrowRight size={16} />
                </span>
              </Link>
              <Link href="/delivery-installation">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Delivery Guide
                </span>
              </Link>
              <Link href="/support">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Warranty & Support
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
