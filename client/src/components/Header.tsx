/**
 * JUDE Header — Concept 3 Style
 * Warm cream background, lowercase serif "jude" wordmark, clean navigation
 */
import { Link, useLocation } from "wouter";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/product";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { totalItems, totalPrice, items, updateQuantity, removeFromCart } = useCart();
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
        <Sheet>
          <SheetTrigger asChild>
            <button className="relative flex items-center gap-2 text-[#1E1E1E] hover:text-[#D93A1D] transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D93A1D] text-[#F5EDE0] text-[10px] font-body font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[#FFFBF5] border-l border-[#D9CFC2] p-0">
            <SheetHeader className="border-b border-[#D9CFC2] p-5">
              <SheetTitle className="font-display text-2xl text-[#1E1E1E]">Cart</SheetTitle>
              <SheetDescription className="font-body text-xs text-[#6B6358]">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your bag
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-auto p-5 space-y-4">
              {items.length === 0 ? (
                <p className="font-body text-sm text-[#6B6358]">Your cart is currently empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="border border-[#D9CFC2] rounded-lg p-3 bg-[#F5EDE0]/50">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded bg-[#FFFBF5] object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-[#1E1E1E] leading-tight">{item.name}</p>
                        <p className="font-mono-brand text-[10px] uppercase tracking-wider text-[#6B6358] mt-1">
                          {item.color}
                        </p>
                        <p className="font-display text-base text-[#D93A1D] mt-2">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[#D9CFC2] rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[#EDE5D8] transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 font-body text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[#EDE5D8] transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B6358] hover:text-[#D93A1D] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <SheetFooter className="border-t border-[#D9CFC2] p-5">
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-[#6B6358]">Subtotal</span>
                  <span className="font-display text-xl text-[#1E1E1E]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SheetClose asChild>
                    <Link href="/cart">
                      <span className="jude-btn-outline w-full">View Cart</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/checkout">
                      <span className="jude-btn-primary w-full">Checkout</span>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      </div>
      {/* Brand gradient rule */}
      <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800]" />
    </header>
  );
}
