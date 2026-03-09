import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, inventory, orders, InsertOrder, Order } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
const FALLBACK_DEFAULT_STOCK = 10;
const fallbackStockMap = new Map<string, number>();
const fallbackOrders = new Map<string, Order>();
let fallbackOrderIdCounter = 1;

function stockKey(productId: string, colorName: string) {
  return `${productId}:${colorName}`;
}

function getFallbackStock(productId: string, colorName: string): number {
  const key = stockKey(productId, colorName);
  const current = fallbackStockMap.get(key);
  if (current === undefined || current <= 0) {
    fallbackStockMap.set(key, FALLBACK_DEFAULT_STOCK);
    return FALLBACK_DEFAULT_STOCK;
  }
  return current;
}

function createFallbackOrder(order: InsertOrder): Order {
  const now = new Date();
  const created: Order = {
    id: fallbackOrderIdCounter++,
    orderNumber: order.orderNumber,
    productId: order.productId,
    colorName: order.colorName,
    quantity: order.quantity ?? 1,
    totalPrice: order.totalPrice,
    firstName: order.firstName,
    lastName: order.lastName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    city: order.city,
    state: order.state,
    zipCode: order.zipCode,
    country: order.country ?? "US",
    status: order.status ?? "pending",
    createdAt: now,
    updatedAt: now,
  };
  fallbackOrders.set(created.orderNumber, created);
  return created;
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  if (!_db && dbUrl) {
    try {
      _db = drizzle(dbUrl);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * List users for admin management page.
 */
export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(users).orderBy(desc(users.lastSignedIn));
  } catch {
    return [];
  }
}

/**
 * Update user role by openId.
 */
export async function updateUserRoleByOpenId(
  openId: string,
  role: InsertUser["role"]
): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const result = await db
      .update(users)
      .set({ role: role ?? "user" })
      .where(eq(users.openId, openId));

    return (result as any)[0]?.affectedRows > 0;
  } catch {
    return false;
  }
}

// ==================== Inventory Helpers ====================

/**
 * Get stock for a specific product/color combination.
 * If no record exists, initialize it with default stock.
 */
export async function getStock(productId: string, colorName: string): Promise<number> {
  const db = await getDb();
  if (!db) return getFallbackStock(productId, colorName);

  try {
    const result = await db
      .select()
      .from(inventory)
      .where(and(eq(inventory.productId, productId), eq(inventory.colorName, colorName)))
      .limit(1);
    if (result.length === 0) {
      try {
        await db.insert(inventory).values({ productId, colorName, stock: FALLBACK_DEFAULT_STOCK });
        return FALLBACK_DEFAULT_STOCK;
      } catch {
        return getFallbackStock(productId, colorName);
      }
    }

    if (result[0].stock <= 0) {
      try {
        await db
          .update(inventory)
          .set({ stock: FALLBACK_DEFAULT_STOCK })
          .where(and(eq(inventory.productId, productId), eq(inventory.colorName, colorName)));
      } catch {
        return getFallbackStock(productId, colorName);
      }
      return FALLBACK_DEFAULT_STOCK;
    }

    return result[0].stock;
  } catch {
    return getFallbackStock(productId, colorName);
  }
}

/**
 * Get all stock levels for a product.
 */
export async function getAllStock(productId: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(inventory)
      .where(eq(inventory.productId, productId));
  } catch {
    return [];
  }
}

/**
 * Decrement stock by quantity. Returns true if successful, false if insufficient stock.
 */
export async function decrementStock(productId: string, colorName: string, quantity: number = 1): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const current = getFallbackStock(productId, colorName);
    if (current < quantity) return false;
    fallbackStockMap.set(stockKey(productId, colorName), current - quantity);
    return true;
  }

  // First check current stock
  const currentStock = await getStock(productId, colorName);
  if (currentStock < quantity) return false;

  // Atomic decrement
  try {
    const result = await db
      .update(inventory)
      .set({ stock: sql`${inventory.stock} - ${quantity}` })
      .where(
        and(
          eq(inventory.productId, productId),
          eq(inventory.colorName, colorName),
          sql`${inventory.stock} >= ${quantity}`
        )
      );
    return (result as any)[0]?.affectedRows > 0;
  } catch {
    const fallbackCurrent = getFallbackStock(productId, colorName);
    if (fallbackCurrent < quantity) return false;
    fallbackStockMap.set(stockKey(productId, colorName), fallbackCurrent - quantity);
    return true;
  }
}

// ==================== Order Helpers ====================

/**
 * Create a new order.
 */
export async function createOrder(order: InsertOrder): Promise<number> {
  const db = await getDb();
  if (!db) {
    const created = createFallbackOrder(order);
    return created.id;
  }

  try {
    const result = await db.insert(orders).values(order);
    return (result as any)[0]?.insertId;
  } catch {
    const created = createFallbackOrder(order);
    return created.id;
  }
}

/**
 * Get order by order number.
 */
export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return fallbackOrders.get(orderNumber);

  try {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch {
    return fallbackOrders.get(orderNumber);
  }
}

/**
 * Get all orders (for admin).
 */
export async function getAllOrders() {
  const db = await getDb();
  if (!db) {
    return Array.from(fallbackOrders.values()).sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  try {
    return await db.select().from(orders).orderBy(orders.createdAt);
  } catch {
    return Array.from(fallbackOrders.values()).sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }
}

/**
 * Get orders for a customer by email (and optional phone).
 * Used for customer-facing order history lookups.
 */
export async function getOrdersByContact(email: string, phone?: string): Promise<Order[]> {
  const db = await getDb();
  if (!db) {
    return Array.from(fallbackOrders.values()).filter(order => {
      if (order.email !== email) return false;
      if (phone && order.phone !== phone) return false;
      return true;
    });
  }

  const whereClause = phone
    ? and(eq(orders.email, email), eq(orders.phone, phone))
    : eq(orders.email, email);

  try {
    return await db
      .select()
      .from(orders)
      .where(whereClause)
      .orderBy(orders.createdAt);
  } catch {
    return Array.from(fallbackOrders.values()).filter(order => {
      if (order.email !== email) return false;
      if (phone && order.phone !== phone) return false;
      return true;
    });
  }
}

/**
 * Update order status by order number (admin use).
 */
export async function updateOrderStatusByNumber(orderNumber: string, status: Order["status"]): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const order = fallbackOrders.get(orderNumber);
    if (!order) return false;
    fallbackOrders.set(orderNumber, { ...order, status, updatedAt: new Date() });
    return true;
  }

  try {
    const result = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.orderNumber, orderNumber));

    return (result as any)[0]?.affectedRows > 0;
  } catch {
    const order = fallbackOrders.get(orderNumber);
    if (!order) return false;
    fallbackOrders.set(orderNumber, { ...order, status, updatedAt: new Date() });
    return true;
  }
}
