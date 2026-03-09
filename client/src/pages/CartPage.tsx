/**
 * JUDE Cart Page — Concept 3 Style
 * =================================
 * Warm cream background, vermillion accents, serif headings
 */
import { Link, useLocation } from "wouter";
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { RECOMMENDED_PAIRINGS, formatPrice } from "@/lib/product";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [, navigate] = useLocation();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto mb-6 text-[#D9CFC2]" />
            <h1 className="font-display text-3xl font-medium text-[#1E1E1E] mb-4">Your Cart is Empty</h1>
            <p className="font-body text-sm text-[#6B6358] mb-8">
              Discover the jude French 4-Door Retro Refrigerator.
            </p>
            <Link href="/product">
              <span className="inline-flex items-center gap-3 bg-[#D93A1D] text-[#F5EDE0] px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-[#C0311A] transition-colors">
                Shop Now <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Back link */}
          <Link href="/product">
            <span className="inline-flex items-center gap-2 font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] hover:text-[#D93A1D] transition-colors mb-8 block">
              <ArrowLeft size={14} /> Continue Shopping
            </span>
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-medium text-[#1E1E1E] mb-2">Your Cart</h1>
          <p className="font-body text-sm text-[#6B6358] mb-8">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>

          <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800] mb-8" />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6 flex gap-6 jude-hover-card"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F5EDE0] rounded flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-medium text-[#1E1E1E]">{item.name}</h3>
                      <p className="font-mono-brand text-xs tracking-wider uppercase text-[#6B6358] mt-1">
                        {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex items-center border border-[#D9CFC2] rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[#EDE5D8] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-body text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[#EDE5D8] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-display text-lg font-medium text-[#D93A1D]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B6358] hover:text-[#D93A1D] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6 sticky top-24">
                <h2 className="font-display text-xl font-medium text-[#1E1E1E] mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-[#6B6358]">Subtotal</span>
                    <span className="text-[#1E1E1E]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-[#6B6358]">Shipping</span>
                    <span className="text-[#A3A800]">Free</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-[#6B6358]">Tax</span>
                    <span className="text-[#1E1E1E]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800] mb-6" />

                <div className="flex justify-between items-center mb-8">
                  <span className="font-display text-lg font-medium text-[#1E1E1E]">Total</span>
                  <span className="font-display text-2xl font-medium text-[#D93A1D]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full flex items-center justify-center gap-3 bg-[#D93A1D] text-[#F5EDE0] px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-[#C0311A] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl text-[#1E1E1E]">Recommended Pairings</h2>
              <span className="font-mono-brand text-[10px] tracking-widest uppercase text-[#6B6358]">
                Optional add-ons
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {RECOMMENDED_PAIRINGS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg overflow-hidden jude-hover-card"
                >
                  <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <h3 className="font-display text-lg text-[#1E1E1E] mb-1">{item.name}</h3>
                    <p className="font-body text-xs text-[#6B6358] mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-brand text-[10px] tracking-wider uppercase text-[#D93A1D]">
                        {item.priceNote}
                      </span>
                      <button
                        onClick={() => navigate("/checkout")}
                        className="font-mono-brand text-[10px] tracking-widest uppercase text-[#1E1E1E] hover:text-[#D93A1D] transition-colors"
                      >
                        Add at checkout
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
