import {
    varchar,
    integer,
    pgTable,
    timestamp,
    uuid,
    serial,
    text,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: uuid('id').primaryKey().defaultRandom(),
    type: varchar('type', { length: 50 })
        .notNull()
        .$type<'admin' | 'user'>()
        .default('user'),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .default(new Date())
        .notNull(),
});

export const user_profile = pgTable('user_profile', {
    profile_id: uuid('profile_id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
        .references(() => user.id)
        .notNull(),
    first_name: varchar('first_name', { length: 100 }).notNull(),
    last_name: varchar('last_name', { length: 100 }).notNull(),
    phone_number: varchar('phone_number', { length: 50 }).notNull(),
});

export const user_address = pgTable('user_address', {
    address_id: serial('address_id').primaryKey(),
    user_id: uuid('user_id')
        .references(() => user_profile.profile_id)
        .notNull(),
    country: varchar('country', { length: 100 }),
    city: varchar('city', { length: 100 }),
    address: text('address'),
    postcode: integer('postcode'),
});
