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
