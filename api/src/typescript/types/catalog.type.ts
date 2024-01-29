import { products } from '../../database/schemas/schema_products';

export type NewProductType = typeof products.$inferInsert;
