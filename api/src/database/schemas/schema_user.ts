import {
    varchar,
    integer,
    pgTable,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 150 }).notNull(),
    password: varchar('password', { length: 150 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .default(new Date())
        .notNull(),
});

export const users_info = pgTable('users_info', {
    user_id: uuid('user_id').references(() => users.id),
    full_name: varchar('full_name', { length: 50 }).notNull(),
    phone_number: varchar('phone_number', { length: 20 }),
});

export const users_address = pgTable('users_address', {
    user_id: uuid('user_id').references(() => users.id),
    country: varchar('country', { length: 100 }),
    city: varchar('city', { length: 100 }),
    address: varchar('address', { length: 50 }),
    zip: integer('zip'),
});
