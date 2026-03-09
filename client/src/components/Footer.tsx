/**
 * JUDE Footer — Concept 3 Style
 * Warm, NYC-inspired with brand statement and gradient accent
 */
export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-[#F5EDE0] relative overflow-hidden">
      {/* Top gradient rule */}
      <div className="h-[3px] bg-gradient-to-r from-[#A3A800] via-[#E8762A] to-[#D93A1D]" />

      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">jude</h2>
            <p className="font-display text-lg md:text-xl text-[#D4917F] italic mb-4">
              your life, styled
            </p>
            <p className="font-body text-sm text-[#9B9488] max-w-md leading-relaxed">
              Rooted in New York City. Inspired by the city's authentic spirit, expressive creativity,
              and thoughtful approach to living. Each detail is intentionally crafted to create homes
              that feel sophisticated, warm, and true to you.
            </p>
            <div className="mt-5 space-y-2">
              <p className="font-body text-sm text-[#9B9488]">support@jude.homes</p>
              <p className="font-body text-sm text-[#9B9488]">Mon-Sat · 9:00-18:00 EST</p>
              <p className="font-body text-sm text-[#9B9488]">New York City</p>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-mono-brand text-xs tracking-widest uppercase text-[#A3A800] mb-6">
              Customer Care
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="/support" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Warranty & Support
              </a>
              <a href="/orders" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Track Existing Order
              </a>
              <a href="/support#faq" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                FAQ
              </a>
              <a href="/support#contact" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Contact
              </a>
              <a href="mailto:support@jude.homes" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Email Support
              </a>
            </nav>
          </div>

          {/* Delivery & Policy */}
          <div>
            <h3 className="font-mono-brand text-xs tracking-widest uppercase text-[#A3A800] mb-6">
              Delivery & Policy
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="/delivery-installation" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Delivery & Installation
              </a>
              <a href="/policies#shipping" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Shipping Summary
              </a>
              <a href="/policies#returns" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Returns & Policy
              </a>
              <a href="/policies#warranty" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Warranty
              </a>
            </nav>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-mono-brand text-xs tracking-widest uppercase text-[#A3A800] mb-6">
              Legal & Social
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="/policies#privacy" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Privacy Policy
              </a>
              <a href="/policies#terms" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Terms of Use
              </a>
              <a href="/policies#legal" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Legal Summary
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Instagram
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-[#333] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358]">
            &copy; {new Date().getFullYear()} jude. All rights reserved.
          </p>
          <p className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358]">
            New York City
          </p>
        </div>
      </div>
    </footer>
  );
}
