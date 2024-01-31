import {
    serial,
    varchar,
    pgTable,
    numeric,
    integer,
    text,
    uuid,
} from 'drizzle-orm/pg-core';
import { users } from './schema_user';

export const categories = pgTable('categories', {
    category_id: serial('category_id').primaryKey(),
    type: varchar('type', { length: 50 })
        .notNull()
        .$type<'cardio' | 'machines' | 'free-weights'>(),
});

export const products = pgTable('products', {
    product_id: uuid('product_id').primaryKey().defaultRandom(),
    category_id: integer('category_id')
        .notNull()
        .references(() => categories.category_id),
    title: varchar('title', { length: 50 }).notNull(),
    price: numeric('price').notNull(),
    description: text('description').notNull(),
    image: text('image'),
});

export const finished_orders = pgTable('finished_orders', {
    order_id: uuid('order_id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
        .notNull()
        .references(() => users.id),
    product_id: uuid('product_id')
        .notNull()
        .references(() => products.product_id),
});
