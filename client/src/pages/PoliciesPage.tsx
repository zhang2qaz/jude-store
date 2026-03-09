import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container pt-6 pb-4">
          <Link href="/support">
            <span className="inline-flex items-center gap-2 font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] hover:text-[#D93A1D] transition-colors">
              <ArrowLeft size={14} /> Back to Support
            </span>
          </Link>
        </div>

        <section className="container pb-10">
          <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">Policies</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] mb-5">Shipping, returns, warranty, and legal.</h1>
          <p className="font-body text-sm md:text-base text-[#6B6358] max-w-3xl leading-relaxed">
            This page summarizes key purchase and ownership policies for jude customers. For order-specific
            exceptions, contact support with your order number.
          </p>
        </section>

        <section id="shipping" className="container pb-8">
          <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
            <h2 className="font-display text-3xl text-[#1E1E1E] mb-3">Delivery & Shipping Summary</h2>
            <ul className="space-y-3 font-body text-sm text-[#6B6358] leading-relaxed">
              <li>- Most U.S. metro deliveries: 7-14 business days after order review.</li>
              <li>- White-glove delivery includes in-home placement and packaging removal in supported areas.</li>
              <li>- Delivery timing may vary based on building access rules, weather, or regional scheduling.</li>
            </ul>
          </div>
        </section>

        <section id="returns" className="container pb-8">
          <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
            <h2 className="font-display text-3xl text-[#1E1E1E] mb-3">Returns & Policy Summary</h2>
            <ul className="space-y-3 font-body text-sm text-[#6B6358] leading-relaxed">
              <li>- Report transit damage within 48 hours of delivery for priority resolution.</li>
              <li>- Unused items in original condition may be eligible for return review within 14 days.</li>
              <li>- Restocking, logistics, and non-returnable conditions may apply based on product state.</li>
            </ul>
          </div>
        </section>

        <section id="warranty" className="container pb-8">
          <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
            <h2 className="font-display text-3xl text-[#1E1E1E] mb-3">Warranty Overview</h2>
            <ul className="space-y-3 font-body text-sm text-[#6B6358] leading-relaxed">
              <li>- 5-year limited warranty for covered component defects under residential use.</li>
              <li>- Warranty support may require proof of purchase and model details.</li>
              <li>- Service availability depends on regional support coverage and partner scheduling.</li>
            </ul>
          </div>
        </section>

        <section id="legal" className="container pb-16">
          <div className="bg-[#1E1E1E] text-[#F5EDE0] rounded-lg p-6">
            <h2 className="font-display text-3xl mb-4">Legal</h2>
            <div id="privacy" className="mb-5">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#A3A800] mb-2">Privacy Policy</p>
              <p className="font-body text-sm text-[#F5EDE0]/85 leading-relaxed">
                jude only uses customer information for order fulfillment, support communication, and service
                quality improvement. Data is handled with reasonable commercial safeguards.
              </p>
            </div>
            <div id="terms">
              <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#A3A800] mb-2">Terms of Use</p>
              <p className="font-body text-sm text-[#F5EDE0]/85 leading-relaxed">
                By placing an order, customers agree to published pricing, delivery conditions, and service
                policies applicable at checkout and confirmation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
