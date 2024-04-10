import {
    varchar,
    integer,
    pgTable,
    timestamp,
    uuid,
    serial,
    numeric,
    text,
} from 'drizzle-orm/pg-core';
import { products } from './schema_products';
import { user_profile } from './schema_user';

export const order_status = pgTable('order_status', {
    status_id: serial('status_id').primaryKey(),
    status_name: varchar('status_name', { length: 50 }).$type<
        'in-process' | 'finished' | 'canceled'
    >(),
});

export const order_info = pgTable('order_info', {
    order_id: uuid('order_id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
        .references(() => user_profile.profile_id, { onDelete: 'cascade' })
        .notNull(),
    total_price: numeric('price').notNull(),
    order_desc: text('order_desc'),
    status_id: integer('status_id')
        .references(() => order_status.status_id, { onDelete: 'set null' })
        .default(1),
    order_date: timestamp('order_date', { withTimezone: true })
        .default(new Date())
        .notNull(),
});

export const user_order_personal_info = pgTable('user_order_personal_info', {
    _id: serial('_id').primaryKey(),
    full_name: varchar('full_name', { length: 255 }).notNull(),
    phone_number: varchar('phone_number', { length: 50 }).notNull(),
    order_id: uuid('order_id')
        .references(() => order_info.order_id, { onDelete: 'cascade' })
        .notNull(),
});

export const user_order_address = pgTable('user_order_address', {
    _id: serial('_id').primaryKey(),
    order_id: uuid('order_id')
        .references(() => order_info.order_id, { onDelete: 'cascade' })
        .notNull(),
    country: varchar('country', { length: 100 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    address: text('address').notNull(),
    postcode: integer('postcode').notNull(),
});

export const order_product_info = pgTable('order_product_info', {
    _id: serial('_id').primaryKey(),
    order_id: uuid('order_id')
        .references(() => order_info.order_id, { onDelete: 'cascade' })
        .notNull(),
    product_id: uuid('product_id')
        .references(() => products.product_id, { onDelete: 'set null' })
        .notNull(),
    quantity: integer('quantity').notNull(),
    subtotal: numeric('subototal').notNull(),
});
