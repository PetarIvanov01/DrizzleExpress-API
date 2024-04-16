import dbLogger from '../../loggers/dbLogger';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as user_schemas from '../database/schemas/schema_user';
import * as product_shemas from '../database/schemas/schema_products';
import * as orders_schemas from '../database/schemas/schema_orders';

export const client = new Client({
    connectionString: process.env.DB_CONN,
    host:
        process.env.NODE_ENV === 'production'
            ? process.env.DB_HOST
            : 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    port: parseInt(process.env.DB_PORT || '5432'),
});

const connectToDB = async () => {
    try {
        await client.connect();
        dbLogger.info('Connected to the database.', {
            host: process.env.DB_HOST,
            env: process.env.NODE_ENV,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
    } catch (err) {
        dbLogger.error(`Error connecting to the database: ${err}`);
        await client.end();
        process.exit(1);
    }
};
connectToDB();

export const db = drizzle(client, {
    schema: { ...user_schemas, ...product_shemas, ...orders_schemas },
});
