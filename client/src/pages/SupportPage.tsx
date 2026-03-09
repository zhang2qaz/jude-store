import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ShieldCheck, CircleHelp, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQS = [
  {
    q: "How long does delivery usually take?",
    a: "Most metro deliveries are completed in 7-14 business days after order review.",
  },
  {
    q: "Do you provide white-glove delivery?",
    a: "Yes. White-glove delivery includes in-home placement and packaging removal in supported regions.",
  },
  {
    q: "What does the warranty cover?",
    a: "The 5-year limited warranty covers manufacturing defects in key components under normal residential use.",
  },
  {
    q: "How do I track or update my order?",
    a: "Use the order tracking page with your email, or contact support for delivery and scheduling help.",
  },
];

export default function SupportPage() {
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

        <section className="container pb-10">
          <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">Warranty & Support</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] mb-5">Help, service, and ownership confidence.</h1>
          <p className="font-body text-sm md:text-base text-[#6B6358] max-w-3xl leading-relaxed">
            Everything you need before and after purchase: warranty summary, support channels, FAQ, and
            delivery coordination guidance.
          </p>
        </section>

        <section className="container pb-10">
          <div className="grid md:grid-cols-3 gap-4">
            <a href="#warranty" className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5 block hover:border-[#A3A800] transition-colors">
              <ShieldCheck size={20} className="text-[#A3A800] mb-3" />
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-1">Warranty</p>
              <p className="font-body text-sm text-[#1E1E1E]">5-year limited coverage overview.</p>
            </a>
            <a href="#faq" className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5 block hover:border-[#A3A800] transition-colors">
              <CircleHelp size={20} className="text-[#A3A800] mb-3" />
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-1">FAQ</p>
              <p className="font-body text-sm text-[#1E1E1E]">Fast answers to common buyer questions.</p>
            </a>
            <a href="#contact" className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5 block hover:border-[#A3A800] transition-colors">
              <Mail size={20} className="text-[#A3A800] mb-3" />
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] mb-1">Contact</p>
              <p className="font-body text-sm text-[#1E1E1E]">Direct support email and order help links.</p>
            </a>
          </div>
        </section>

        <section id="warranty" className="bg-[#FFFBF5] border-y border-[#D9CFC2] py-14 md:py-16">
          <div className="container">
            <h2 className="font-display text-3xl text-[#1E1E1E] mb-4">Warranty Summary</h2>
            <p className="font-body text-sm text-[#6B6358] max-w-3xl leading-relaxed mb-6">
              jude provides a 5-year limited warranty for major functional components on qualified
              residential purchases. We recommend keeping your order number and delivery record for the
              fastest service response.
            </p>
            <ul className="space-y-3 font-body text-sm text-[#1E1E1E]">
              <li>- 5-year limited component coverage for manufacturing defects.</li>
              <li>- Premium support guidance for troubleshooting and service coordination.</li>
              <li>- Response prioritization for verified order owners.</li>
            </ul>
          </div>
        </section>

        <section id="faq" className="container py-14 md:py-16">
          <h2 className="font-display text-3xl text-[#1E1E1E] mb-6">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((item) => (
              <div key={item.q} className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5">
                <h3 className="font-display text-2xl text-[#1E1E1E] mb-2">{item.q}</h3>
                <p className="font-body text-sm text-[#6B6358] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container pb-16">
          <div className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] rounded-lg p-7 md:p-8 text-[#F5EDE0]">
            <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#F5EDE0]/80 mb-2">
              Contact
            </p>
            <h3 className="font-display text-3xl mb-3">Need direct assistance?</h3>
            <p className="font-body text-sm md:text-base text-[#F5EDE0]/90 mb-5 max-w-2xl">
              For delivery windows, installation preparation, warranty questions, or order updates, contact
              the support team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:support@jude.homes" className="jude-btn-primary">
                Contact Support <ArrowRight size={16} />
              </a>
              <Link href="/orders">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Track Existing Order
                </span>
              </Link>
              <Link href="/delivery-installation">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Delivery & Installation
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
