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
        <div className="grid md:grid-cols-4 gap-12">
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
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-mono-brand text-xs tracking-widest uppercase text-[#A3A800] mb-6">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="/product" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Shop
              </a>
              <a href="/cart" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                Cart
              </a>
              <a href="/" className="font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors">
                About
              </a>
            </nav>
          </div>

          {/* Trust & Support */}
          <div>
            <h3 className="font-mono-brand text-xs tracking-widest uppercase text-[#A3A800] mb-6">
              Support
            </h3>
            <div className="space-y-3">
              <p className="font-body text-sm text-[#9B9488]">5-year limited warranty</p>
              <p className="font-body text-sm text-[#9B9488]">White-glove delivery available</p>
              <a
                href="mailto:support@jude.homes"
                className="block font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors"
              >
                support@jude.homes
              </a>
              <a
                href="/orders"
                className="block font-body text-sm text-[#9B9488] hover:text-[#F5EDE0] transition-colors"
              >
                Order Help
              </a>
            </div>
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
