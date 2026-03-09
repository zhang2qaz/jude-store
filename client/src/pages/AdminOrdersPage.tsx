import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice } from "@/lib/product";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | (typeof STATUS_OPTIONS)[number]>("all");

  const {
    data,
    isLoading,
    error,
    refetch,
  } = trpc.order.adminListAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const updateStatus = trpc.order.adminUpdateStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: phoneStatsData,
    isLoading: phoneStatsLoading,
    error: phoneStatsError,
  } = trpc.order.adminPhoneStats.useQuery(
    {
      q: search.trim() || undefined,
      limit: 30,
    },
    { refetchOnWindowFocus: false }
  );

  const orders = useMemo(() => data?.orders ?? [], [data]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter(order => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!q) return true;

      const fullName = `${order.firstName} ${order.lastName}`.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        (order.email ?? "").toLowerCase().includes(q) ||
        (order.phone ?? "").toLowerCase().includes(q) ||
        fullName.includes(q) ||
        (order.city ?? "").toLowerCase().includes(q) ||
        (order.state ?? "").toLowerCase().includes(q)
      );
    });
  }, [orders, search, statusFilter]);

  const summary = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const uniquePhones = new Set(filteredOrders.map(order => order.phone)).size;
    const pendingCount = filteredOrders.filter(order => order.status === "pending").length;
    return { totalOrders, totalRevenue, uniquePhones, pendingCount };
  }, [filteredOrders]);

  const formatDate = (value: unknown) => {
    if (!value) return "";
    return new Date(value as string).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage all orders, customer phone concentration, and follow-up priorities.
          </p>
        </div>

        {(error || phoneStatsError) && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error?.message ?? phoneStatsError?.message}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Orders (filtered)</p>
            <p className="mt-2 text-2xl font-semibold">{summary.totalOrders}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Revenue (filtered)</p>
            <p className="mt-2 text-2xl font-semibold">{formatPrice(summary.totalRevenue)}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Unique Phones</p>
            <p className="mt-2 text-2xl font-semibold">{summary.uniquePhones}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Pending Orders</p>
            <p className="mt-2 text-2xl font-semibold">{summary.pendingCount}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_180px]">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by order #, name, email, phone, city..."
              className="h-10 rounded border bg-background px-3 text-sm"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as "all" | (typeof STATUS_OPTIONS)[number])}
              className="h-10 rounded border bg-background px-3 text-sm"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-medium">Top Customer Phones</h2>
            <p className="text-xs text-muted-foreground">
              {phoneStatsLoading
                ? "Loading phone statistics..."
                : `Showing ${phoneStatsData?.phones.length ?? 0} rows · ${phoneStatsData?.totalUniquePhones ?? 0} unique phones`}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Orders</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Revenue</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Latest</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Customer Names</th>
                </tr>
              </thead>
              <tbody>
                {(phoneStatsData?.phones ?? []).map(item => (
                  <tr key={item.phoneKey} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-mono text-xs">{item.phoneDisplay}</td>
                    <td className="px-4 py-2 text-xs">{item.orderCount}</td>
                    <td className="px-4 py-2 text-xs">{formatPrice(item.totalRevenue)}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{formatDate(item.latestOrderAt)}</td>
                    <td className="px-4 py-2 text-xs">{item.customerNames.slice(0, 2).join(" / ") || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Order #
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.orderNumber} className="border-b last:border-b-0">
                    <td className="px-4 py-3 font-mono text-xs">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(order.createdAt as unknown as string)}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {order.firstName} {order.lastName}
                        </span>
                        <span className="text-muted-foreground">{order.email}</span>
                        <span className="text-muted-foreground">{order.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="flex flex-col">
                        <span>
                          {order.colorName} × {order.quantity}
                        </span>
                        <span className="text-muted-foreground">
                          {order.city}, {order.state}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium">
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <select
                        className="rounded border px-2 py-1 text-xs bg-background"
                        value={order.status}
                        onChange={e =>
                          updateStatus.mutate({
                            orderNumber: order.orderNumber,
                            status: e.target.value as (typeof STATUS_OPTIONS)[number],
                          })
                        }
                        disabled={updateStatus.isPending}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

