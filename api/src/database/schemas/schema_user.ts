import { serial, varchar, pgTable, timestamp, integer } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 150 }).notNull(),
    password: varchar('password', { length: 150 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).default(new Date()).notNull()
});

export const users_info = pgTable('users_info', {
    user_id: integer('id').references(() => users.id),
    full_name: varchar('full_name', { length: 50 }).notNull(),
    phone_number: varchar('phone_number', { length: 20 })
});

// export const session = pgTable('user_session', {
//     sessionId: serial('sessionId').primaryKey(),
//     email: varchar('email', { length: 150 }).notNull(),
//     createdAt: timestamp("created_at", { withTimezone: true }).default(new Date()).notNull(),
//     valid: boolean('valid').notNull(),
// });