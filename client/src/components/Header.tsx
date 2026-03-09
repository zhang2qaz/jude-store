/**
 * JUDE Header — Concept 3 Style
 * Warm cream background, lowercase serif "jude" wordmark, clean navigation
 */
import { Link, useLocation } from "wouter";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#1E1E1E] text-[#F5EDE0]">
        <div className="container h-8 flex items-center justify-center">
          <p className="font-mono-brand text-[10px] tracking-widest uppercase">
            Free Shipping · Premium Support · Limited Color Drop
          </p>
        </div>
      </div>
      <div className="bg-[#F5EDE0]/95 backdrop-blur-sm border-b border-[#D9CFC2]">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <span className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[#1E1E1E]">
            jude
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/product">
            <span className={`font-mono-brand text-xs tracking-widest uppercase transition-colors ${location === '/product' ? 'text-[#D93A1D]' : 'text-[#6B6358] hover:text-[#1E1E1E]'}`}>
              Shop
            </span>
          </Link>
          <Link href="/">
            <span className={`font-mono-brand text-xs tracking-widest uppercase transition-colors ${location === '/' ? 'text-[#D93A1D]' : 'text-[#6B6358] hover:text-[#1E1E1E]'}`}>
              About
            </span>
          </Link>
          <Link href="/orders">
            <span className={`font-mono-brand text-xs tracking-widest uppercase transition-colors ${location === '/orders' ? 'text-[#D93A1D]' : 'text-[#6B6358] hover:text-[#1E1E1E]'}`}>
              Track Order
            </span>
          </Link>
        </nav>

        {/* Cart */}
        <Link href="/cart">
          <span className="relative flex items-center gap-2 text-[#1E1E1E] hover:text-[#D93A1D] transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D93A1D] text-[#F5EDE0] text-[10px] font-body font-medium flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </span>
        </Link>
      </div>
      </div>
      {/* Brand gradient rule */}
      <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800]" />
    </header>
  );
}
