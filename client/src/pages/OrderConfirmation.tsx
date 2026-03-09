/**
 * JUDE Order Confirmation — Concept 3 Style
 * ==========================================
 * Shows order details from server, with trademark evidence display
 */
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/lib/product";

export default function OrderConfirmation() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const orderNum = params.get("order") || "";

  const { data } = trpc.order.getByNumber.useQuery(
    { orderNumber: orderNum },
    { enabled: !!orderNum }
  );

  const order = data?.order;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full bg-[#A3A800] flex items-center justify-center mx-auto mb-8"
            >
              <Check size={32} className="text-[#F5EDE0]" />
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl font-medium text-[#1E1E1E] mb-4">
              Thank You
            </h1>
            <p className="font-body text-lg text-[#6B6358] mb-2">
              Your order has been placed successfully.
            </p>
            <p className="font-body text-sm text-[#6B6358] mb-8">
              Order number: <span className="font-medium text-[#D93A1D]">{orderNum || "N/A"}</span>
            </p>

            <div className="h-[2px] bg-gradient-to-r from-[#D93A1D] via-[#E8762A] to-[#A3A800] mb-8" />

            {/* Order Details */}
            <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-8 text-left mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Package size={20} className="text-[#D93A1D]" />
                <h2 className="font-display text-xl font-medium text-[#1E1E1E]">Order Details</h2>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                  <span className="text-[#6B6358]">Product</span>
                  <span className="font-medium text-[#1E1E1E]">jude French 4-Door Retro Refrigerator</span>
                </div>
                {order && (
                  <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                    <span className="text-[#6B6358]">Color</span>
                    <span className="font-medium text-[#1E1E1E]">{order.colorName}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                  <span className="text-[#6B6358]">Order Number</span>
                  <span className="font-medium text-[#1E1E1E]">{orderNum}</span>
                </div>
                {order && (
                  <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                    <span className="text-[#6B6358]">Customer</span>
                    <span className="font-medium text-[#1E1E1E]">{order.firstName} {order.lastName}</span>
                  </div>
                )}
                {order && (
                  <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                    <span className="text-[#6B6358]">Total</span>
                    <span className="font-medium text-[#D93A1D]">{formatPrice(order.totalPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                  <span className="text-[#6B6358]">Status</span>
                  <span className="font-medium text-[#A3A800]">Confirmed</span>
                </div>
                <div className="flex justify-between font-body text-sm py-3 border-b border-[#D9CFC2]">
                  <span className="text-[#6B6358]">Shipping</span>
                  <span className="font-medium text-[#1E1E1E]">Free — Standard Delivery</span>
                </div>
                <div className="flex justify-between font-body text-sm py-3">
                  <span className="text-[#6B6358]">Estimated Delivery</span>
                  <span className="font-medium text-[#1E1E1E]">5–10 Business Days</span>
                </div>
              </div>
            </div>

            <p className="font-body text-sm text-[#6B6358] mb-8">
              A sales representative will contact you shortly. Please keep your phone accessible. Thank you for choosing jude.
            </p>

            <p className="font-body text-xs text-[#6B6358] mb-6">
              You can view this and other orders later on the order history page using your email.
            </p>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-3 bg-[#D93A1D] text-[#F5EDE0] px-10 py-4 font-body text-sm tracking-wider uppercase hover:bg-[#C0311A] transition-colors"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
