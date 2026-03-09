/**
 * JUDE Product Page — Concept 3 Style
 * ====================================
 * Features: Server-side inventory, color selector, add to cart
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Check, Minus, Plus, ArrowLeft, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCT, RECOMMENDED_PAIRINGS, formatPrice } from "@/lib/product";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { addToCart } = useCart();

  const currentColor = PRODUCT.colors[selectedColor];

  // Fetch stock from server
  const { data: stockData } = trpc.inventory.getStock.useQuery({
    productId: PRODUCT.id,
    colorName: currentColor.name,
  });
  const currentStock = stockData?.stock ?? PRODUCT.inventory;

  const handleAddToCart = () => {
    if (currentStock <= 0) {
      toast.error("Out of stock", { description: "This color is currently unavailable." });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${PRODUCT.id}-${currentColor.name}`,
        name: PRODUCT.name,
        price: PRODUCT.price,
        image: currentColor.image,
        color: currentColor.name,
      });
    }
    setAdded(true);
    toast.success(`Added to cart — ${currentColor.name}`, {
      description: `${quantity} × ${formatPrice(PRODUCT.price)}`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container pt-6 pb-4">
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] hover:text-[#D93A1D] transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </span>
          </Link>
        </div>

        {/* Product Section */}
        <div className="container pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div>
              {/* Main Image */}
              <motion.div
                key={selectedColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FFFBF5] rounded-lg border border-[#D9CFC2] p-8 md:p-12 aspect-square flex items-center justify-center mb-4 overflow-hidden jude-hover-card"
              >
                <img
                  src={currentColor.image}
                  alt={`jude Refrigerator in ${currentColor.name}`}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
                />
              </motion.div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-5 gap-2">
                {PRODUCT.colors.slice(0, 5).map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className={`bg-[#FFFBF5] rounded border p-2 aspect-square flex items-center justify-center transition-all ${
                      selectedColor === i
                        ? "border-[#D93A1D] shadow-sm"
                        : "border-[#D9CFC2] hover:border-[#A3A800]"
                    }`}
                  >
                    <img
                      src={color.image}
                      alt={color.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col lg:sticky lg:top-28 h-fit">
              <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">
                Premium Appliance
              </p>

              <h1 className="font-display text-3xl md:text-4xl font-medium text-[#1E1E1E] mb-2">
                {PRODUCT.name}
              </h1>

              <p className="font-display text-2xl md:text-3xl text-[#D93A1D] font-medium mb-6">
                {formatPrice(PRODUCT.price)}
              </p>

              <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800] mb-6" />

              <p className="font-body text-sm text-[#6B6358] leading-relaxed mb-8">
                {PRODUCT.description}
              </p>

              {/* Color Selector */}
              <div className="mb-8">
                <p className="font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] mb-4">
                  Color — <span className="text-[#1E1E1E]">{currentColor.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {PRODUCT.colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(i);
                        setQuantity(1);
                      }}
                      className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                        selectedColor === i
                          ? "border-[#D93A1D] scale-110 shadow-md"
                          : "border-[#D9CFC2] hover:border-[#A3A800]"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === i && (
                        <Check
                          size={14}
                          className={`absolute inset-0 m-auto ${
                            ["#1a1a1a", "#2e4ead", "#4a6741", "#9b7db8"].includes(color.hex)
                              ? "text-white"
                              : "text-[#1E1E1E]"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="font-mono-brand text-xs tracking-widest uppercase text-[#6B6358] mb-4">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-[#D9CFC2] rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-[#EDE5D8] transition-colors"
                    disabled={currentStock <= 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 font-body text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    className="p-3 hover:bg-[#EDE5D8] transition-colors"
                    disabled={currentStock <= 0}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className={`font-body text-xs mt-2 ${currentStock > 0 ? "text-[#A3A800]" : "text-[#D93A1D]"}`}>
                  {currentStock > 0 ? `${currentStock} units available` : "Out of Stock"}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={added || currentStock <= 0}
                className={`w-full flex items-center justify-center gap-3 py-4 px-8 text-sm font-body tracking-wider uppercase transition-all mb-3 ${
                  currentStock <= 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : added
                    ? "bg-[#A3A800] text-[#F5EDE0]"
                    : "bg-[#D93A1D] text-[#F5EDE0] hover:bg-[#C0311A] hover:-translate-y-0.5"
                }`}
              >
                {currentStock <= 0 ? (
                  "Out of Stock"
                ) : added ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now */}
              <button
                onClick={() => {
                  if (currentStock <= 0) return;
                  handleAddToCart();
                  navigate("/checkout");
                }}
                disabled={currentStock <= 0}
                className={`w-full flex items-center justify-center gap-3 border-2 font-body text-sm tracking-wider uppercase py-4 transition-all mb-4 ${
                  currentStock <= 0
                    ? "border-gray-400 text-gray-400 cursor-not-allowed"
                    : "border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-[#F5EDE0] hover:-translate-y-0.5"
                }`}
              >
                Buy Now
              </button>

              {/* Inventory note */}
              <p className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358] text-center mb-8">
                {currentStock > 0
                  ? `Only ${currentStock} units available worldwide`
                  : "Currently sold out — check back soon"}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#D9CFC2]">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck size={20} className="text-[#A3A800]" />
                  <span className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358]">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield size={20} className="text-[#A3A800]" />
                  <span className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358]">
                    5-Year Warranty
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Check size={20} className="text-[#A3A800]" />
                  <span className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358]">
                    Secure Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Story Module */}
        <section className="bg-[#FFFBF5] border-y border-[#D9CFC2] py-16 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden border border-[#D9CFC2] jude-hover-card">
                  <img
                    src={PRODUCT.heroImage}
                    alt={`${PRODUCT.name} editorial angle`}
                    className="w-full h-full object-cover min-h-[280px]"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-[#D9CFC2] jude-hover-card">
                  <img
                    src={PRODUCT.secondaryImage}
                    alt={`${PRODUCT.name} lifestyle angle`}
                    className="w-full h-full object-cover min-h-[280px]"
                  />
                </div>
              </div>
              <div>
                <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-3">
                  Editorial Note
                </p>
                <h3 className="font-display text-3xl text-[#1E1E1E] mb-5 leading-tight">
                  A statement piece for modern kitchens.
                </h3>
                <p className="font-body text-sm text-[#6B6358] leading-relaxed mb-6">
                  Inspired by design magazines and boutique interiors, this refrigerator is made to be
                  seen. Bold finishes, balanced proportions, and refined details make it the visual
                  anchor of your space.
                </p>
                <blockquote className="border-l-2 border-[#D93A1D] pl-4 font-display text-xl text-[#1E1E1E]">
                  “Designed to perform like an appliance, and present like furniture.”
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Specs */}
        <section className="bg-[#1E1E1E] text-[#F5EDE0] py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-4">Features</p>
                <h2 className="font-display text-3xl font-medium mb-8">Built Without Compromise</h2>
                <ul className="space-y-4">
                  {PRODUCT.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D93A1D] mt-2 shrink-0" />
                      <span className="font-body text-sm text-[#F5EDE0]/80 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-4">Specifications</p>
                <h2 className="font-display text-3xl font-medium mb-8">Technical Details</h2>
                <div className="space-y-0">
                  {Object.entries(PRODUCT.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-[#F5EDE0]/10">
                      <span className="font-mono-brand text-xs tracking-wider uppercase text-[#F5EDE0]/50">{key}</span>
                      <span className="font-body text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Statement Banner */}
        <section className="bg-[#6B8CDB] grain-overlay">
          <div className="container relative z-10 py-16 md:py-20">
            <p className="font-display text-2xl md:text-3xl font-medium text-[#F5EDE0] max-w-3xl leading-snug">
              {PRODUCT.brandStatement}
            </p>
          </div>
        </section>

        {/* Cross-sell Module */}
        <section className="bg-[#F5EDE0] py-16 md:py-20">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="font-mono-brand text-xs tracking-[0.3em] uppercase text-[#A3A800] mb-2">
                  Recommended Pairings
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">Complete the Experience</h2>
              </div>
              <p className="font-body text-sm text-[#6B6358] max-w-md">
                Add premium services to get the most from your purchase. Mention your preference at
                checkout and our team will include it in your quote.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {RECOMMENDED_PAIRINGS.map((item) => (
                <div key={item.id} className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg overflow-hidden jude-hover-card">
                  <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <h3 className="font-display text-xl text-[#1E1E1E] mb-2">{item.name}</h3>
                    <p className="font-body text-sm text-[#6B6358] leading-relaxed mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-brand text-xs tracking-wider uppercase text-[#D93A1D]">
                        {item.priceNote}
                      </span>
                      <button
                        onClick={() => navigate("/checkout")}
                        className="text-[#1E1E1E] font-mono-brand text-[11px] tracking-widest uppercase hover:text-[#D93A1D] transition-colors"
                      >
                        Add at Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
