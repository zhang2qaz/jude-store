import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function AboutPage() {
  usePageMeta({
    title: "About jude | Premium Appliance Brand Positioning",
    description:
      "Learn what jude is, why the brand exists, which appliance category it is entering, and how product, policy, delivery, and support systems are structured.",
  });

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
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] mb-5">
            A focused appliance brand, built for long-cycle purchases.
          </h1>
          <p className="font-body text-sm md:text-base text-[#6B6358] max-w-3xl leading-relaxed">
            jude is a U.S.-focused premium home appliance brand currently entering the high-consideration
            refrigeration category. We build full-size refrigerators with clear product specifications,
            service policies, and post-purchase support designed for real ownership.
          </p>
        </section>

        <section className="container pb-8">
          <div className="flex flex-wrap gap-2">
            <a href="#company-profile" className="px-3 py-2 border border-[#D9CFC2] bg-[#FFFBF5] rounded font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] hover:text-[#1E1E1E] hover:border-[#A3A800] transition-colors">
              Company Profile
            </a>
            <a href="#category-positioning" className="px-3 py-2 border border-[#D9CFC2] bg-[#FFFBF5] rounded font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] hover:text-[#1E1E1E] hover:border-[#A3A800] transition-colors">
              Category Positioning
            </a>
            <a href="#operating-model" className="px-3 py-2 border border-[#D9CFC2] bg-[#FFFBF5] rounded font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] hover:text-[#1E1E1E] hover:border-[#A3A800] transition-colors">
              Operating Model
            </a>
            <a href="#service-capability" className="px-3 py-2 border border-[#D9CFC2] bg-[#FFFBF5] rounded font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] hover:text-[#1E1E1E] hover:border-[#A3A800] transition-colors">
              Service Capability
            </a>
          </div>
        </section>

        <section className="bg-[#FFFBF5] border-y border-[#D9CFC2] py-14 md:py-16">
          <div className="container grid lg:grid-cols-3 gap-5">
            <div id="company-profile" className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/40">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                What jude is
              </p>
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Company profile</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                jude is a premium appliance company focused on high-consideration household purchases. The
                current product focus is full-size refrigerators, with an operating model built around clear
                specifications, delivery planning, and long-cycle ownership support.
              </p>
            </div>
            <div id="category-positioning" className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/40">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                Why it exists
              </p>
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Design-led, operations-backed</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                jude is positioned at the intersection of premium product design and practical purchasing
                confidence. We emphasize measurable details: dimensions and fit, electrical requirements,
                warranty coverage, and delivery readiness.
              </p>
            </div>
            <div id="operating-model" className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/40">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                How we operate
              </p>
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Reduce decision risk in premium appliances</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                Large-appliance buyers often face uncertainty around fit, access, and post-purchase support.
                jude exists to reduce that uncertainty with structured information, transparent policies, and
                reachable customer care.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-6" id="service-capability">
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                Operating model
              </p>
              <h3 className="font-display text-3xl text-[#1E1E1E] mb-4">How jude runs the commerce flow</h3>
              <ul className="space-y-3 font-body text-sm text-[#6B6358] leading-relaxed">
                <li>- Product pages include technical specs, fit guidance, and delivery planning details.</li>
                <li>- Checkout and support flows are paired with contact and order-tracking entry points.</li>
                <li>- Policy pages summarize shipping, returns, warranty, and legal terms in one structure.</li>
                <li>- FAQ and support pages are organized for pre-purchase and post-purchase scenarios.</li>
              </ul>
            </div>
            <div className="bg-[#1E1E1E] text-[#F5EDE0] rounded-lg p-6">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#A3A800] mb-2">
                Service capability
              </p>
              <h3 className="font-display text-3xl mb-4">What customers can verify today</h3>
              <ul className="space-y-3 font-body text-sm text-[#F5EDE0]/85 leading-relaxed">
                <li>- Active product category: premium full-size refrigeration.</li>
                <li>- Market focus: U.S. buyers, including urban apartment delivery conditions.</li>
                <li>- Available channels: support email, FAQ, policy summaries, order tracking.</li>
                <li>- Ownership support: delivery guidance, warranty summary, and escalation path.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] rounded-lg p-7 md:p-8 text-[#F5EDE0]">
            <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#F5EDE0]/80 mb-2">
              Verification Paths
            </p>
            <h3 className="font-display text-3xl mb-3">Review the details before you buy.</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/product">
                <span className="jude-btn-primary">
                  Product Details <ArrowRight size={16} />
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
              <Link href="/policies">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Policies
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
