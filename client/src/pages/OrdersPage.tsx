import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/product";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";

const inputClass =
  "w-full border border-[#D9CFC2] bg-[#FFFBF5] rounded px-4 py-3 font-body text-sm text-[#1E1E1E] placeholder:text-[#9B9488] focus:border-[#D93A1D] focus:outline-none focus:ring-1 focus:ring-[#D93A1D]/20 transition-colors";

export default function OrdersPage() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    email: "",
    phone: "",
  });
  const [searchParams, setSearchParams] = useState<{ email: string; phone?: string } | null>(null);

  const queryInput =
    searchParams ?? ({
      email: "placeholder@example.com",
      phone: "",
    } as const);

  const {
    data,
    isLoading,
    error,
  } = trpc.order.listByContact.useQuery(queryInput, {
    enabled: !!searchParams,
  });

  const orders = data?.orders ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (!email) return;
    setSearchParams({
      email,
      phone: phone || undefined,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container py-12 md:py-16 max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-medium text-[#1E1E1E] mb-4">
            Order History
          </h1>
          <p className="font-body text-sm text-[#6B6358] mb-8">
            Enter the email (and optionally phone number) you used at checkout to view your past
            orders.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-6 space-y-4 mb-10"
          >
            <div className="space-y-2">
              <label className="font-mono-brand text-[11px] tracking-widest uppercase text-[#6B6358]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono-brand text-[11px] tracking-widest uppercase text-[#6B6358]">
                Phone Number <span className="text-[#A3A800]">(optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 000 0000"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D93A1D] text-[#F5EDE0] px-8 py-3 font-body text-sm tracking-wider uppercase rounded hover:bg-[#C0311A] transition-colors"
            >
              <Search size={16} />
              Search Orders
            </button>
          </form>

          {error && (
            <p className="font-body text-sm text-[#D93A1D] mb-4">
              {error.message || "Failed to load orders."}
            </p>
          )}

          {isLoading && (
            <p className="font-body text-sm text-[#6B6358]">Loading your orders...</p>
          )}

          {!isLoading && searchParams && orders.length === 0 && !error && (
            <p className="font-body text-sm text-[#6B6358]">
              No orders found for this contact information.
            </p>
          )}

          {!isLoading && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map(order => (
                <button
                  key={order.orderNumber}
                  onClick={() =>
                    navigate(`/order-confirmation?order=${encodeURIComponent(order.orderNumber)}`)
                  }
                  className="w-full text-left bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5 hover:border-[#D93A1D] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-mono-brand text-[11px] tracking-widest uppercase text-[#6B6358]">
                        Order #{order.orderNumber}
                      </p>
                      <p className="font-body text-xs text-[#9B9488] mt-1">
                        {order.createdAt
                          ? new Date(order.createdAt as unknown as string).toLocaleString()
                          : ""}
                      </p>
                    </div>
                    <span className="font-display text-lg font-medium text-[#D93A1D]">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="font-body text-sm text-[#6B6358]">
                      <p>
                        Color: <span className="font-medium text-[#1E1E1E]">{order.colorName}</span>
                      </p>
                      <p>
                        Quantity:{" "}
                        <span className="font-medium text-[#1E1E1E]">{order.quantity}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-brand text-[11px] tracking-widest uppercase text-[#6B6358]">
                        {order.status}
                      </span>
                      <ArrowRight size={14} className="text-[#6B6358]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

