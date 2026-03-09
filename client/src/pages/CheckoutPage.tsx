/**
 * JUDE Checkout Page — Concept 3 Style
 * =====================================
 * Server-side order placement with inventory check and owner notification
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, CreditCard, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/product";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const inputClass = "w-full border border-[#D9CFC2] bg-[#FFFBF5] rounded px-4 py-3 font-body text-sm text-[#1E1E1E] placeholder:text-[#9B9488] focus:border-[#D93A1D] focus:outline-none focus:ring-1 focus:ring-[#D93A1D]/20 transition-colors";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const placeOrder = trpc.order.place.useMutation();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Process each cart item as a separate order
      for (const item of items) {
        const result = await placeOrder.mutateAsync({
          productId: item.id.split("-").slice(0, -2).join("-") || "jude-french-4door-retro-refrigerator",
          colorName: item.color,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zip,
          country: form.country,
        });

        setOrderNumber(result.orderNumber);
      }

      // Show success modal
      setShowSuccessModal(true);
    } catch (error: any) {
      const msg = error?.message || "Failed to place order. Please try again.";
      toast.error("Order Failed", { description: msg });
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    clearCart();
    setShowSuccessModal(false);
    navigate(`/order-confirmation?order=${orderNumber}`);
  };

  if (items.length === 0 && !showSuccessModal) {
    navigate("/cart");
    return null;
  }

  const tax = Math.round(totalPrice * 0.08875);
  const grandTotal = totalPrice + tax;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FFFBF5] rounded-lg p-8 md:p-10 max-w-lg mx-4 text-center shadow-2xl border border-[#D9CFC2]"
          >
            <div className="w-16 h-16 bg-[#A3A800]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-[#A3A800]" />
            </div>
            <h2 className="font-display text-2xl font-medium text-[#1E1E1E] mb-4">
              Order Confirmed
            </h2>
            <p className="font-body text-sm text-[#6B6358] leading-relaxed mb-6">
              Your order has been successfully placed. A sales representative will contact you shortly. Please keep your phone accessible. Thank you for your support.
            </p>
            <p className="font-mono-brand text-xs tracking-wider uppercase text-[#A3A800] mb-6">
              Order #{orderNumber}
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full bg-[#D93A1D] text-[#F5EDE0] font-body text-sm tracking-wider uppercase py-4 hover:bg-[#C0311A] transition-colors rounded"
            >
              View Order Details
            </button>
          </motion.div>
        </div>
      )}

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex items-center gap-3 mb-2">
            <Lock size={16} className="text-[#A3A800]" />
            <h1 className="font-display text-3xl md:text-4xl font-medium text-[#1E1E1E]">Checkout</h1>
          </div>
          <p className="font-body text-sm text-[#6B6358] mb-8">Secure checkout powered by jude</p>

          <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800] mb-8" />

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form Sections */}
              <div className="lg:col-span-2 space-y-10">
                {/* Contact */}
                <section>
                  <h2 className="font-display text-xl font-medium text-[#1E1E1E] mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      required
                      className={inputClass}
                    />
                  </div>
                </section>

                {/* Shipping */}
                <section>
                  <h2 className="font-display text-xl font-medium text-[#1E1E1E] mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                    className={`${inputClass} mt-4`}
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="ZIP code"
                      required
                      className={inputClass}
                    />
                  </div>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={`${inputClass} mt-4`}
                  >
                    <option>United States</option>
                  </select>
                </section>

                {/* Payment */}
                <section>
                  <h2 className="font-display text-xl font-medium text-[#1E1E1E] mb-4">Payment</h2>
                  <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard size={18} className="text-[#D93A1D]" />
                      <span className="font-body text-sm font-medium text-[#1E1E1E]">Credit Card</span>
                    </div>
                    <input
                      type="text"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleChange}
                      placeholder="Name on card"
                      required
                      className={`${inputClass} mb-4`}
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="Card number"
                      required
                      className={`${inputClass} mb-4`}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        required
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name="cardCvc"
                        value={form.cardCvc}
                        onChange={handleChange}
                        placeholder="CVC"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6 sticky top-24">
                  <h2 className="font-display text-xl font-medium text-[#1E1E1E] mb-6">Order Summary</h2>

                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-[#D9CFC2]">
                      <div className="w-16 h-16 bg-[#F5EDE0] rounded shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm font-medium text-[#1E1E1E] leading-tight">{item.name}</p>
                        <p className="font-mono-brand text-[10px] tracking-wider uppercase text-[#6B6358] mt-1">
                          {item.color} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-body text-sm font-medium text-[#1E1E1E]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}

                  <div className="space-y-3 mt-4 mb-6">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-[#6B6358]">Subtotal</span>
                      <span className="text-[#1E1E1E]">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-[#6B6358]">Shipping</span>
                      <span className="text-[#A3A800]">Free</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-[#6B6358]">Tax (8.875%)</span>
                      <span className="text-[#1E1E1E]">{formatPrice(tax)}</span>
                    </div>
                  </div>

                  <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800] mb-6" />

                  <div className="flex justify-between items-center mb-8">
                    <span className="font-display text-lg font-medium text-[#1E1E1E]">Total</span>
                    <span className="font-display text-2xl font-medium text-[#D93A1D]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-3 bg-[#D93A1D] text-[#F5EDE0] font-body text-sm tracking-wider uppercase py-4 hover:bg-[#C0311A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[#F5EDE0] border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Lock size={16} />
                        Place Order — {formatPrice(grandTotal)}
                      </>
                    )}
                  </button>

                  <p className="font-mono-brand text-[10px] tracking-wider text-center text-[#6B6358] mt-4">
                    Your payment information is secure and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
