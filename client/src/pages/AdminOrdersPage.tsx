import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice } from "@/lib/product";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

export default function AdminOrdersPage() {
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

  const orders = useMemo(() => data?.orders ?? [], [data]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all orders placed through the store.
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error.message}
          </div>
        )}

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        ) : orders.length === 0 ? (
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
                {orders.map(order => (
                  <tr key={order.orderNumber} className="border-b last:border-b-0">
                    <td className="px-4 py-3 font-mono text-xs">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {order.createdAt
                        ? new Date(order.createdAt as unknown as string).toLocaleString()
                        : ""}
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

