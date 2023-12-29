import { serial, varchar, pgTable, numeric, integer,text } from "drizzle-orm/pg-core"
import { users } from "./schema_user";

export const categories = pgTable('categories', {
    category_id: serial('category_id').primaryKey(),
    type: varchar('type', { length: 50 }).notNull().$type<"cardio" | "machines" | "free-weights">()
});

export const products = pgTable('products', {
    product_id: serial('product_id').primaryKey(),
    category_id: integer('category_id').notNull().references(() => categories.category_id),
    title: varchar('title', { length: 50 }).notNull(),
    price: numeric('price', { precision: 5, scale: 2 }).notNull(),
    description: varchar("description", { length: 150 }).notNull(),
    image: text("image")
});

export const finished_orders = pgTable('finished_orders', {
    order_id: serial('order_id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => users.id),
    product_id: integer('product_id').notNull().references(() => products.product_id)
});