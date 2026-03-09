import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Ruler, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

const STEPS = [
  {
    title: "Order Review (within 24 hours)",
    detail:
      "Our support team confirms your color, address, and preferred delivery window. For apartment buildings, we also confirm elevator and service-hour requirements.",
  },
  {
    title: "Pre-Delivery Check (2-5 days before)",
    detail:
      "You receive a reminder to verify doorway, hallway, and stair clearance. If needed, we help coordinate building access and loading-zone timing.",
  },
  {
    title: "Delivery Day",
    detail:
      "White-glove teams deliver, position, and unbox your appliance. Optional haul-away and placement guidance are available at appointment confirmation.",
  },
];

export default function DeliveryInfoPage() {
  usePageMeta({
    title: "Delivery & Installation Guide | jude",
    description:
      "Review jude delivery timelines, white-glove handling, installation preparation, and apartment/building-access checklist before ordering.",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container pt-6 pb-4">
          <Link href="/product">
            <span className="inline-flex items-center gap-2 font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] hover:text-[#D93A1D] transition-colors">
              <ArrowLeft size={14} /> Back to Product
            </span>
          </Link>
        </div>

        <section className="container pb-12">
          <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">
            Delivery & Installation
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] mb-5">
            Know exactly what happens after checkout.
          </h1>
          <p className="font-body text-sm md:text-base text-[#6B6358] max-w-3xl leading-relaxed">
            Built for New York and U.S. high-consideration appliance buyers. This guide clarifies
            delivery expectations, white-glove handling, and installation preparation before your order
            arrives.
          </p>
        </section>

        <section className="container pb-12">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5">
              <Truck size={20} className="text-[#A3A800] mb-3" />
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                Delivery expectation
              </p>
              <p className="font-body text-sm text-[#1E1E1E]">Estimated 7-14 business days in most U.S. metro areas.</p>
            </div>
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5">
              <CheckCircle2 size={20} className="text-[#A3A800] mb-3" />
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                White-glove support
              </p>
              <p className="font-body text-sm text-[#1E1E1E]">
                In-home placement with packaging removal. Optional haul-away can be requested.
              </p>
            </div>
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5">
              <Ruler size={20} className="text-[#A3A800] mb-3" />
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-2">
                Measurement reminder
              </p>
              <p className="font-body text-sm text-[#1E1E1E]">
                Confirm doorway, hallway, elevator, and turn radius before scheduling.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#FFFBF5] border-y border-[#D9CFC2] py-14 md:py-16">
          <div className="container">
            <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-4">
              How It Works
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {STEPS.map((step) => (
                <div key={step.title} className="border border-[#D9CFC2] rounded-lg p-5 bg-[#F5EDE0]/50">
                  <h2 className="font-display text-2xl text-[#1E1E1E] mb-3">{step.title}</h2>
                  <p className="font-body text-sm text-[#6B6358] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#1E1E1E] text-[#F5EDE0] rounded-lg p-6">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#A3A800] mb-3">
                Apartment & Townhouse Checklist
              </p>
              <ul className="space-y-3 font-body text-sm text-[#F5EDE0]/85">
                <li>- Reserve elevator or loading dock if required by building management.</li>
                <li>- Confirm service elevator dimensions and booking window.</li>
                <li>- Measure all tight turns between entry and final kitchen location.</li>
                <li>- Ensure an adult (18+) is present for delivery acceptance.</li>
              </ul>
            </div>
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-3">
                Installation Preparation
              </p>
              <ul className="space-y-3 font-body text-sm text-[#1E1E1E]">
                <li>- Confirm a grounded 120V / 60Hz outlet is available and accessible.</li>
                <li>- Leave recommended rear/side/top clearance for ventilation.</li>
                <li>- Clear fragile decor and rugs from the delivery path.</li>
                <li>- Review final placement side (hinge opening and aisle flow).</li>
              </ul>
              <p className="font-body text-sm text-[#6B6358] mt-5">
                Need help before ordering? Email{" "}
                <a
                  href="mailto:support@jude.homes"
                  className="text-[#D93A1D] hover:text-[#C0311A] underline underline-offset-2"
                >
                  support@jude.homes
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="container pb-16">
          <div className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] rounded-lg p-7 md:p-8 text-[#F5EDE0]">
            <p className="font-mono-brand text-[10px] tracking-widest uppercase mb-2 text-[#F5EDE0]/80">
              FAQ entry points
            </p>
            <h3 className="font-display text-3xl mb-3">Still deciding?</h3>
            <p className="font-body text-sm md:text-base text-[#F5EDE0]/90 mb-5 max-w-2xl">
              We can help with fit checks, building access planning, lead time, or installation questions
              before you place your order.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:support@jude.homes?subject=Delivery%20and%20Installation%20Question"
                className="jude-btn-primary"
              >
                Contact Support <ArrowRight size={16} />
              </a>
              <Link href="/orders">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Existing Order Help
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
