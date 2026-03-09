import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/product";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

const inputClass =
  "w-full border border-[#D9CFC2] bg-[#FFFBF5] rounded px-4 py-3 font-body text-sm text-[#1E1E1E] placeholder:text-[#9B9488] focus:border-[#D93A1D] focus:outline-none focus:ring-1 focus:ring-[#D93A1D]/20 transition-colors";

export default function OwnerOrdersPage() {
  const [keyInput, setKeyInput] = useState("");
  const [submittedKey, setSubmittedKey] = useState("");

  const { data, error, isLoading } = trpc.order.ownerListByKey.useQuery(
    { key: submittedKey || "placeholder" },
    { enabled: Boolean(submittedKey), refetchOnWindowFocus: false }
  );

  const orders = data?.orders ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0]">
      <Header />

      <main className="flex-1">
        <div className="container py-10 md:py-14 max-w-5xl">
          <h1 className="font-display text-3xl md:text-4xl font-medium text-[#1E1E1E] mb-2">
            Owner Order Dashboard
          </h1>
          <p className="font-body text-sm text-[#6B6358] mb-8">
            输入后台密钥后，可查看全部下单信息。
          </p>

          <div className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5 mb-8">
            <label className="font-mono-brand text-[11px] tracking-widest uppercase text-[#6B6358]">
              Dashboard Key
            </label>
            <div className="mt-3 flex gap-3">
              <input
                type="password"
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                className={inputClass}
                placeholder="输入 OWNER_DASHBOARD_KEY"
              />
              <button
                onClick={() => setSubmittedKey(keyInput.trim())}
                className="shrink-0 bg-[#D93A1D] text-[#F5EDE0] px-6 py-3 rounded font-body text-sm uppercase tracking-wider hover:bg-[#C0311A] transition-colors"
              >
                查看订单
              </button>
            </div>
          </div>

          {isLoading && <p className="font-body text-sm text-[#6B6358]">加载中...</p>}
          {error && <p className="font-body text-sm text-[#D93A1D]">{error.message}</p>}

          {!isLoading && !error && submittedKey && orders.length === 0 && (
            <p className="font-body text-sm text-[#6B6358]">暂无订单。</p>
          )}

          {!isLoading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.orderNumber}
                  className="bg-[#FFFBF5] border border-[#D9CFC2] rounded-lg p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono-brand text-[11px] tracking-widest uppercase text-[#6B6358]">
                      Order #{order.orderNumber}
                    </p>
                    <span className="font-display text-lg text-[#D93A1D]">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[#1E1E1E]">
                    {order.firstName} {order.lastName} | {order.phone} | {order.email}
                  </p>
                  <p className="font-body text-sm text-[#6B6358] mt-1">
                    {order.colorName} x {order.quantity} | {order.address}, {order.city}, {order.state}{" "}
                    {order.zipCode}, {order.country}
                  </p>
                  <p className="font-body text-xs text-[#6B6358] mt-2">
                    状态: {order.status} | 下单时间:{" "}
                    {order.createdAt ? new Date(order.createdAt as unknown as string).toLocaleString() : "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

