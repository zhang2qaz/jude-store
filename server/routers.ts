import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getStock,
  getAllStock,
  decrementStock,
  createOrder,
  getOrderByNumber,
  getAllOrders,
  getOrdersByContact,
  updateOrderStatusByNumber,
  getAllUsers,
  updateUserRoleByOpenId,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { nanoid } from "nanoid";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  inventory: router({
    /** Get stock for a specific product/color */
    getStock: publicProcedure
      .input(z.object({
        productId: z.string(),
        colorName: z.string(),
      }))
      .query(async ({ input }) => {
        const stock = await getStock(input.productId, input.colorName);
        return { stock };
      }),

    /** Get all stock levels for a product */
    getAllStock: publicProcedure
      .input(z.object({
        productId: z.string(),
      }))
      .query(async ({ input }) => {
        const stocks = await getAllStock(input.productId);
        return { stocks };
      }),
  }),

  admin: router({
    /** Admin: list users and their order aggregates */
    userList: adminProcedure
      .input(
        z
          .object({
            q: z.string().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const [users, allOrders] = await Promise.all([getAllUsers(), getAllOrders()]);
        const query = input?.q?.trim().toLowerCase();

        const rows = users.map(user => {
          const userOrders = allOrders.filter(
            order =>
              (user.email && order.email === user.email) ||
              (user.name &&
                `${order.firstName} ${order.lastName}`.trim().toLowerCase() === user.name.toLowerCase())
          );

          const orderCount = userOrders.length;
          const totalRevenue = userOrders.reduce((sum, order) => sum + order.totalPrice, 0);
          const latestOrderAt =
            userOrders.length > 0
              ? new Date(
                  Math.max(...userOrders.map(order => new Date(order.createdAt as unknown as string).getTime()))
                ).toISOString()
              : null;

          return {
            id: user.id,
            openId: user.openId,
            name: user.name,
            email: user.email,
            role: user.role,
            lastSignedIn: user.lastSignedIn,
            createdAt: user.createdAt,
            orderCount,
            totalRevenue,
            latestOrderAt,
          };
        });

        const filtered = query
          ? rows.filter(item =>
              item.openId.toLowerCase().includes(query) ||
              (item.name ?? "").toLowerCase().includes(query) ||
              (item.email ?? "").toLowerCase().includes(query)
            )
          : rows;

        filtered.sort((a, b) => {
          if (a.role !== b.role) return a.role === "admin" ? -1 : 1;
          if (b.orderCount !== a.orderCount) return b.orderCount - a.orderCount;
          return new Date(b.lastSignedIn as unknown as string).getTime() - new Date(a.lastSignedIn as unknown as string).getTime();
        });

        return { users: filtered };
      }),

    /** Admin: update user role */
    userUpdateRole: adminProcedure
      .input(
        z.object({
          openId: z.string().min(1),
          role: z.enum(["user", "admin"]),
        })
      )
      .mutation(async ({ input }) => {
        if (ENV.ownerOpenId && input.openId === ENV.ownerOpenId && input.role !== "admin") {
          throw new Error("OWNER_OPEN_ID cannot be downgraded");
        }

        const ok = await updateUserRoleByOpenId(input.openId, input.role);
        if (!ok) {
          throw new Error("Failed to update user role");
        }
        return { success: true } as const;
      }),
  }),

  order: router({
    /** Place a new order — decrements inventory and notifies owner */
    place: publicProcedure
      .input(z.object({
        productId: z.string(),
        colorName: z.string(),
        quantity: z.number().min(1).default(1),
        totalPrice: z.number(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        zipCode: z.string().min(1),
        country: z.string().default("US"),
        paymentMethod: z.enum(["bank_transfer", "sales_contact"]).default("bank_transfer"),
      }))
      .mutation(async ({ input }) => {
        // Check and decrement stock
        const success = await decrementStock(input.productId, input.colorName, input.quantity);
        if (!success) {
          throw new Error("Insufficient stock. This item is currently out of stock.");
        }

        // Generate order number
        const orderNumber = `JUDE-${nanoid(8).toUpperCase()}`;

        // Create order
        const orderId = await createOrder({
          orderNumber,
          productId: input.productId,
          colorName: input.colorName,
          quantity: input.quantity,
          totalPrice: input.totalPrice,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          address: input.address,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          country: input.country,
          status: "pending",
        });

        // Notify owner about the new order
        try {
          await notifyOwner({
            title: `🛒 New Order: ${orderNumber}`,
            content: [
              `**New order received!**`,
              ``,
              `**Order Number:** ${orderNumber}`,
              `**Product:** jude French 4-Door Retro Refrigerator`,
              `**Color:** ${input.colorName}`,
              `**Quantity:** ${input.quantity}`,
              `**Total:** $${(input.totalPrice).toLocaleString()}`,
              `**Payment Method:** ${input.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Sales Contact"}`,
              ``,
              `**Customer Information:**`,
              `- Name: ${input.firstName} ${input.lastName}`,
              `- Email: ${input.email}`,
              `- Phone: ${input.phone}`,
              ``,
              `**Shipping Address:**`,
              `${input.address}`,
              `${input.city}, ${input.state} ${input.zipCode}`,
              `${input.country}`,
            ].join("\n"),
          });
        } catch (err) {
          console.warn("[Order] Failed to notify owner:", err);
        }

        return {
          success: true,
          orderNumber,
          orderId,
        };
      }),

    /** Get order by order number */
    getByNumber: publicProcedure
      .input(z.object({ orderNumber: z.string() }))
      .query(async ({ input }) => {
        const order = await getOrderByNumber(input.orderNumber);
        return { order };
      }),

    /** Get orders for a customer (by email and optional phone) */
    listByContact: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          phone: z.string().min(1).optional(),
        })
      )
      .query(async ({ input }) => {
        const orders = await getOrdersByContact(input.email, input.phone);
        return { orders };
      }),

    /** Admin: list all orders */
    adminListAll: adminProcedure.query(async () => {
      const orders = await getAllOrders();
      return { orders };
    }),

    /** Admin: summarize customer phones and order concentration */
    adminPhoneStats: adminProcedure
      .input(
        z
          .object({
            q: z.string().optional(),
            limit: z.number().int().min(1).max(200).default(50),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const allOrders = await getAllOrders();

        const normalizePhoneKey = (raw: string) => {
          const digits = raw.replace(/\D/g, "");
          if (!digits) return raw.trim().toLowerCase();
          if (digits.length >= 10) return digits.slice(-10);
          return digits;
        };

        const formatPhoneDisplay = (raw: string) => {
          const digits = raw.replace(/\D/g, "");
          const local = digits.length >= 10 ? digits.slice(-10) : digits;
          if (local.length === 10) {
            return `+1 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
          }
          return raw.trim();
        };

        const byPhone = new Map<
          string,
          {
            phoneKey: string;
            phoneDisplay: string;
            orderCount: number;
            totalRevenue: number;
            latestOrderAt: string | null;
            customerNames: Set<string>;
            emails: Set<string>;
          }
        >();

        for (const order of allOrders) {
          const rawPhone = order.phone ?? "";
          const phoneKey = normalizePhoneKey(rawPhone);
          const existing = byPhone.get(phoneKey);
          const name = `${order.firstName} ${order.lastName}`.trim();
          const orderTime = order.createdAt ? new Date(order.createdAt as unknown as string).toISOString() : null;

          if (!existing) {
            byPhone.set(phoneKey, {
              phoneKey,
              phoneDisplay: formatPhoneDisplay(rawPhone),
              orderCount: 1,
              totalRevenue: order.totalPrice,
              latestOrderAt: orderTime,
              customerNames: new Set(name ? [name] : []),
              emails: new Set(order.email ? [order.email] : []),
            });
            continue;
          }

          existing.orderCount += 1;
          existing.totalRevenue += order.totalPrice;
          if (name) existing.customerNames.add(name);
          if (order.email) existing.emails.add(order.email);
          if (!existing.latestOrderAt || (orderTime && orderTime > existing.latestOrderAt)) {
            existing.latestOrderAt = orderTime;
          }
        }

        const query = input?.q?.trim().toLowerCase();
        let rows = Array.from(byPhone.values()).map(item => ({
          phoneKey: item.phoneKey,
          phoneDisplay: item.phoneDisplay,
          orderCount: item.orderCount,
          totalRevenue: item.totalRevenue,
          latestOrderAt: item.latestOrderAt,
          customerNames: Array.from(item.customerNames),
          emails: Array.from(item.emails),
        }));

        if (query) {
          rows = rows.filter(item =>
            item.phoneDisplay.toLowerCase().includes(query) ||
            item.phoneKey.includes(query) ||
            item.customerNames.some(name => name.toLowerCase().includes(query)) ||
            item.emails.some(email => email.toLowerCase().includes(query))
          );
        }

        rows.sort((a, b) => {
          if (b.orderCount !== a.orderCount) return b.orderCount - a.orderCount;
          if (b.totalRevenue !== a.totalRevenue) return b.totalRevenue - a.totalRevenue;
          return (b.latestOrderAt ?? "").localeCompare(a.latestOrderAt ?? "");
        });

        const limit = input?.limit ?? 50;
        const top = rows.slice(0, limit);

        return {
          phones: top,
          totalUniquePhones: byPhone.size,
          totalRowsAfterFilter: rows.length,
        };
      }),

    /** Admin: update order status */
    adminUpdateStatus: adminProcedure
      .input(
        z.object({
          orderNumber: z.string().min(1),
          status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
        })
      )
      .mutation(async ({ input }) => {
        const ok = await updateOrderStatusByNumber(input.orderNumber, input.status);
        if (!ok) {
          throw new Error("Failed to update order status");
        }
        return { success: true } as const;
      }),

    /** Owner dashboard: list all orders by secret key */
    ownerListByKey: publicProcedure
      .input(z.object({ key: z.string().min(1) }))
      .query(async ({ input }) => {
        if (!ENV.ownerDashboardKey) {
          throw new Error("OWNER_DASHBOARD_KEY is not configured");
        }
        if (input.key !== ENV.ownerDashboardKey) {
          throw new Error("Invalid dashboard key");
        }
        const orders = await getAllOrders();
        return { orders };
      }),
  }),
});

export type AppRouter = typeof appRouter;
