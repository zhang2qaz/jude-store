import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => {
  let stockMap: Record<string, number> = {};
  let orderStore: Record<string, any> = {};

  return {
    getStock: vi.fn(async (productId: string, colorName: string) => {
      const key = `${productId}:${colorName}`;
      return stockMap[key] ?? 10;
    }),
    getAllStock: vi.fn(async () => []),
    decrementStock: vi.fn(async (productId: string, colorName: string, quantity: number) => {
      const key = `${productId}:${colorName}`;
      const current = stockMap[key] ?? 10;
      if (current < quantity) return false;
      stockMap[key] = current - quantity;
      return true;
    }),
    createOrder: vi.fn(async (order: any) => {
      orderStore[order.orderNumber] = order;
      return 1;
    }),
    getOrderByNumber: vi.fn(async (orderNumber: string) => {
      return orderStore[orderNumber] || undefined;
    }),
    // Reset helper for tests
    _reset: () => {
      stockMap = {};
      orderStore = {};
    },
    _setStock: (productId: string, colorName: string, stock: number) => {
      stockMap[`${productId}:${colorName}`] = stock;
    },
    // These are needed by the module but not tested here
    upsertUser: vi.fn(),
    getUserByOpenId: vi.fn(),
    getAllOrders: vi.fn(async () => []),
  };
});

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("inventory.getStock", () => {
  beforeEach(async () => {
    const db = await import("./db");
    (db as any)._reset();
  });

  it("returns default stock of 10 for new product/color", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inventory.getStock({
      productId: "jude-french-4door-retro-refrigerator",
      colorName: "Vermillion Red",
    });

    expect(result.stock).toBe(10);
  });

  it("returns custom stock when set", async () => {
    const db = await import("./db");
    (db as any)._setStock("jude-french-4door-retro-refrigerator", "Royal Blue", 5);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inventory.getStock({
      productId: "jude-french-4door-retro-refrigerator",
      colorName: "Royal Blue",
    });

    expect(result.stock).toBe(5);
  });
});

describe("order.place", () => {
  beforeEach(async () => {
    const db = await import("./db");
    (db as any)._reset();
  });

  it("places an order successfully and returns order number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.order.place({
      productId: "jude-french-4door-retro-refrigerator",
      colorName: "Vermillion Red",
      quantity: 1,
      totalPrice: 49999,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "212-555-0100",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    });

    expect(result.success).toBe(true);
    expect(result.orderNumber).toMatch(/^JUDE-/);
    expect(result.orderId).toBe(1);
  });

  it("decrements stock after placing an order", async () => {
    const db = await import("./db");
    (db as any)._setStock("jude-french-4door-retro-refrigerator", "Vermillion Red", 3);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.order.place({
      productId: "jude-french-4door-retro-refrigerator",
      colorName: "Vermillion Red",
      quantity: 1,
      totalPrice: 49999,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "212-555-0100",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    });

    // Stock should be decremented
    const stockResult = await caller.inventory.getStock({
      productId: "jude-french-4door-retro-refrigerator",
      colorName: "Vermillion Red",
    });
    expect(stockResult.stock).toBe(2);
  });

  it("fails when stock is insufficient", async () => {
    const db = await import("./db");
    (db as any)._setStock("jude-french-4door-retro-refrigerator", "Vermillion Red", 0);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.order.place({
        productId: "jude-french-4door-retro-refrigerator",
        colorName: "Vermillion Red",
        quantity: 1,
        totalPrice: 49999,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "212-555-0100",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
      })
    ).rejects.toThrow("Insufficient stock");
  });

  it("notifies owner after successful order", async () => {
    const { notifyOwner } = await import("./_core/notification");

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.order.place({
      productId: "jude-french-4door-retro-refrigerator",
      colorName: "Vermillion Red",
      quantity: 1,
      totalPrice: 49999,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "212-555-0200",
      address: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10022",
      country: "US",
    });

    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("New Order"),
        content: expect.stringContaining("Jane Smith"),
      })
    );
  });
});

describe("order.getByNumber", () => {
  it("returns undefined for non-existent order", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.order.getByNumber({
      orderNumber: "JUDE-NONEXIST",
    });

    expect(result.order).toBeUndefined();
  });
});
