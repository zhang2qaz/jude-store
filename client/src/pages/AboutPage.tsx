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

        <section className="bg-[#FFFBF5] border-y border-[#D9CFC2] py-14 md:py-16">
          <div className="container grid lg:grid-cols-3 gap-5">
            <div className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/40">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                What jude is
              </p>
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Category-first positioning</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                We are not a broad lifestyle marketplace. jude focuses on premium large-appliance buying
                journeys where dimensions, power requirements, delivery planning, and service reliability
                matter as much as visual design.
              </p>
            </div>
            <div className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/40">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                Why it exists
              </p>
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Bridge design and ownership reality</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                Many buyers must choose between visually expressive products and practical ownership
                confidence. jude exists to close that gap by combining strong aesthetics with transparent
                specs, clear policies, and accountable support channels.
              </p>
            </div>
            <div className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/40">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                How we operate
              </p>
              <h2 className="font-display text-2xl text-[#1E1E1E] mb-2">Narrow assortment, higher clarity</h2>
              <p className="font-body text-sm text-[#6B6358] leading-relaxed">
                We prioritize a narrower catalog with deeper product information. The current focus is
                premium refrigeration, paired with white-glove logistics guidance, warranty visibility, and
                direct support for order owners.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                Credibility Signals
              </p>
              <h3 className="font-display text-3xl text-[#1E1E1E] mb-4">What makes this purchase process reliable</h3>
              <ul className="space-y-3 font-body text-sm text-[#6B6358] leading-relaxed">
                <li>- Structured product specifications and fit guidance before checkout.</li>
                <li>- Delivery and installation planning support for apartment and townhouse access.</li>
                <li>- 5-year limited warranty summary and direct support contact path.</li>
                <li>- Public policy pages for shipping, returns, and legal terms.</li>
              </ul>
            </div>
            <div className="bg-[#1E1E1E] text-[#F5EDE0] rounded-lg p-6">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#A3A800] mb-2">
                Current Scope
              </p>
              <h3 className="font-display text-3xl mb-4">Where jude is today</h3>
              <ul className="space-y-3 font-body text-sm text-[#F5EDE0]/85 leading-relaxed">
                <li>- Primary category: premium full-size refrigerators.</li>
                <li>- Market focus: U.S. buyers, with strong attention to New York urban delivery realities.</li>
                <li>- Service model: direct support email and order tracking workflow.</li>
                <li>- Experience model: design-forward catalog with practical ownership documentation.</li>
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
