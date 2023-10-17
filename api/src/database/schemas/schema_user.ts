import { serial, varchar, pgTable, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable('users1', {
    id: serial('id').primaryKey(),
    username: varchar('name', { length: 150 }).notNull(),
    email: varchar('email', { length: 150 }).notNull(),
    password: varchar('password', { length: 150 }).notNull(),
    role: varchar('role', { length: 80 }).$type<"admin" | "customer">().default('customer').notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
});

