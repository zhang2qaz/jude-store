import DashboardLayout from "@/components/DashboardLayout";
import { formatPrice } from "@/lib/product";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";

const ROLE_OPTIONS = ["user", "admin"] as const;

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    error,
    refetch,
  } = trpc.admin.userList.useQuery(
    { q: search.trim() || undefined },
    { refetchOnWindowFocus: false }
  );

  const updateRole = trpc.admin.userUpdateRole.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const users = useMemo(() => data?.users ?? [], [data]);
  const summary = useMemo(() => {
    const totalUsers = users.length;
    const adminUsers = users.filter(u => u.role === "admin").length;
    const buyerUsers = users.filter(u => u.orderCount > 0).length;
    const revenue = users.reduce((sum, u) => sum + u.totalRevenue, 0);
    return { totalUsers, adminUsers, buyerUsers, revenue };
  }, [users]);

  const formatDate = (value: unknown) => {
    if (!value) return "-";
    return new Date(value as string).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users & Permissions</h1>
          <p className="text-sm text-muted-foreground">
            Manage admin access and review user-level customer value.
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error.message}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total Users</p>
            <p className="mt-2 text-2xl font-semibold">{summary.totalUsers}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin Users</p>
            <p className="mt-2 text-2xl font-semibold">{summary.adminUsers}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Users With Orders</p>
            <p className="mt-2 text-2xl font-semibold">{summary.buyerUsers}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Revenue by Known Users</p>
            <p className="mt-2 text-2xl font-semibold">{formatPrice(summary.revenue)}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, openId..."
            className="h-10 w-full rounded border bg-background px-3 text-sm"
          />
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">openId</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Orders</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Revenue</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Sign In</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.openId} className="border-b last:border-b-0">
                    <td className="px-4 py-3 text-xs">
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name || "-"}</span>
                        <span className="text-muted-foreground">{user.email || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px]">{user.openId}</td>
                    <td className="px-4 py-3 text-xs">{user.orderCount}</td>
                    <td className="px-4 py-3 text-xs">{formatPrice(user.totalRevenue)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(user.lastSignedIn)}</td>
                    <td className="px-4 py-3 text-xs">
                      <select
                        className="rounded border px-2 py-1 text-xs bg-background"
                        value={user.role}
                        onChange={e =>
                          updateRole.mutate({
                            openId: user.openId,
                            role: e.target.value as (typeof ROLE_OPTIONS)[number],
                          })
                        }
                        disabled={updateRole.isPending}
                      >
                        {ROLE_OPTIONS.map(role => (
                          <option key={role} value={role}>
                            {role}
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
