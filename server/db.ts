import { eq, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, inventory, orders, InsertOrder, Order } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

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

// ==================== Inventory Helpers ====================

/**
 * Get stock for a specific product/color combination.
 * If no record exists, initialize it with default stock.
 */
export async function getStock(productId: string, colorName: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select()
    .from(inventory)
    .where(and(eq(inventory.productId, productId), eq(inventory.colorName, colorName)))
    .limit(1);

  if (result.length === 0) {
    // Initialize stock with default 10 units
    await db.insert(inventory).values({ productId, colorName, stock: 10 });
    return 10;
  }

  // If historical data contains zero/negative stock, normalize it to 10.
  if (result[0].stock <= 0) {
    await db
      .update(inventory)
      .set({ stock: 10 })
      .where(and(eq(inventory.productId, productId), eq(inventory.colorName, colorName)));
    return 10;
  }

  return result[0].stock;
}

/**
 * Get all stock levels for a product.
 */
export async function getAllStock(productId: string) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(inventory)
    .where(eq(inventory.productId, productId));
}

/**
 * Decrement stock by quantity. Returns true if successful, false if insufficient stock.
 */
export async function decrementStock(productId: string, colorName: string, quantity: number = 1): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  // First check current stock
  const currentStock = await getStock(productId, colorName);
  if (currentStock < quantity) return false;

  // Atomic decrement
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
}

// ==================== Order Helpers ====================

/**
 * Create a new order.
 */
export async function createOrder(order: InsertOrder): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orders).values(order);
  return (result as any)[0]?.insertId;
}

/**
 * Get order by order number.
 */
export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all orders (for admin).
 */
export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(orders).orderBy(orders.createdAt);
}

/**
 * Get orders for a customer by email (and optional phone).
 * Used for customer-facing order history lookups.
 */
export async function getOrdersByContact(email: string, phone?: string): Promise<Order[]> {
  const db = await getDb();
  if (!db) return [];

  const whereClause = phone
    ? and(eq(orders.email, email), eq(orders.phone, phone))
    : eq(orders.email, email);

  return db
    .select()
    .from(orders)
    .where(whereClause)
    .orderBy(orders.createdAt);
}

/**
 * Update order status by order number (admin use).
 */
export async function updateOrderStatusByNumber(orderNumber: string, status: Order["status"]): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.orderNumber, orderNumber));

  return (result as any)[0]?.affectedRows > 0;
}
