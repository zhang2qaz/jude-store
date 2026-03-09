import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageMeta } from "@/hooks/usePageMeta";

const FAQ_GROUPS = [
  {
    id: "product",
    title: "Product Basics",
    items: [
      {
        q: "What exactly is this product?",
        a: "The jude French 4-Door Retro Refrigerator is a 508L premium appliance designed for statement kitchens, combining expressive color finishes with modern cooling performance.",
      },
      {
        q: "Is this a full-size family refrigerator?",
        a: "Yes. It is built as a full-size home unit with multi-zone storage and everyday household capacity.",
      },
    ],
  },
  {
    id: "fit",
    title: "Dimensions & Fit",
    items: [
      {
        q: "How do I confirm it will fit my home?",
        a: "Measure doorway width, hallway turns, elevator dimensions, and the final kitchen opening before ordering. Compare these against the dimensions listed on the product page.",
      },
      {
        q: "Do I need clearance around the refrigerator?",
        a: "Yes. Keep recommended rear, side, and top clearance for proper ventilation and door opening.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Installation",
    items: [
      {
        q: "How long does delivery usually take?",
        a: "Most U.S. metro deliveries are completed in 7-14 business days after order review and scheduling confirmation.",
      },
      {
        q: "Is white-glove delivery available?",
        a: "Yes. White-glove delivery includes in-home placement and packaging removal in supported regions.",
      },
      {
        q: "What should apartment or townhouse buyers prepare?",
        a: "Reserve service elevators or loading access if required, confirm building delivery windows, and ensure an adult is present to receive delivery.",
      },
      {
        q: "Do you provide installation help?",
        a: "We provide setup guidance and placement recommendations. Confirm electrical readiness and site clearance before your appointment.",
      },
    ],
  },
  {
    id: "warranty-support",
    title: "Warranty & Support",
    items: [
      {
        q: "What warranty is included?",
        a: "A 5-year limited warranty is included for covered manufacturing defects under standard residential use.",
      },
      {
        q: "How can I contact support quickly?",
        a: "Email support@jude.homes with your order number and issue details for priority handling.",
      },
    ],
  },
  {
    id: "returns-preorder",
    title: "Returns & Preorder",
    items: [
      {
        q: "What if my item arrives damaged?",
        a: "Report transit damage within 48 hours of delivery so the team can prioritize your resolution.",
      },
      {
        q: "Can I request a return?",
        a: "Unused items in original condition may be eligible for return review within 14 days. Logistics and restocking conditions may apply.",
      },
      {
        q: "Do you support preorder-style reservations?",
        a: "For limited color drops or low-stock windows, contact support before checkout to confirm availability and estimated timeline.",
      },
    ],
  },
];

export default function FaqPage() {
  usePageMeta({
    title: "FAQ | Product, Delivery, Installation, Warranty | jude",
    description:
      "Read jude pre-purchase FAQs covering product basics, dimensions and fit, delivery, installation, warranty, support, returns, and preorder guidance.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_GROUPS.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        }))
      ),
    },
  });

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
          <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">FAQ</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] mb-5">Answers before you contact support.</h1>
          <p className="font-body text-sm md:text-base text-[#6B6358] max-w-3xl leading-relaxed">
            This FAQ is focused on pre-purchase clarity: what the product is, fit and dimensions, delivery,
            installation, warranty, support, and return or preorder topics.
          </p>
        </section>

        <section className="container pb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FAQ_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-3 font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358] hover:border-[#A3A800] hover:text-[#1E1E1E] transition-colors text-center"
              >
                {group.title}
              </a>
            ))}
          </div>
        </section>

        <section className="container pb-16 space-y-5">
          {FAQ_GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg px-5 py-3">
              <h2 className="font-display text-3xl text-[#1E1E1E] pt-3 mb-1">{group.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((item, idx) => (
                  <AccordionItem key={item.q} value={`${group.id}-${idx}`} className="border-[#D9CFC2]">
                    <AccordionTrigger className="font-body text-sm text-[#1E1E1E] hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-[#6B6358] leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>

        <section className="container pb-16">
          <div className="bg-gradient-to-r from-[#A3A800] to-[#D93A1D] rounded-lg p-7 md:p-8 text-[#F5EDE0]">
            <p className="font-mono-brand text-[10px] tracking-widest uppercase text-[#F5EDE0]/80 mb-2">
              Still need help?
            </p>
            <h3 className="font-display text-3xl mb-3">Contact support with your scenario.</h3>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:support@jude.homes" className="jude-btn-primary">
                Contact Support <ArrowRight size={16} />
              </a>
              <Link href="/delivery-installation">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Delivery Guide
                </span>
              </Link>
              <Link href="/policies">
                <span className="jude-btn-outline border-[#F5EDE0] text-[#F5EDE0] hover:bg-[#F5EDE0] hover:text-[#1E1E1E]">
                  Policy Summary
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
