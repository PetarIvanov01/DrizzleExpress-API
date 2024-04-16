import 'dotenv/config';
import dbLogger from '../../loggers/dbLogger';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, ClientConfig } from 'pg';

import * as user_schemas from '../database/schemas/schema_user';
import * as product_shemas from '../database/schemas/schema_products';
import * as orders_schemas from '../database/schemas/schema_orders';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const ENV = process.env.NODE_ENV;
const IS_PRODUCTION = ENV?.includes('production');

const options: ClientConfig = IS_PRODUCTION
    ? {
          connectionString: process.env.DB_CONN,
          ssl: {
              rejectUnauthorized: false,
          },
      }
    : {
          host: 'localhost',
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: parseInt(process.env.DB_PORT || '5432'),
      };
export const client = new Client(options);

const connectToDB = async () => {
    try {
        await client.connect();
        dbLogger.info('Connected to the database.', {
            host: process.env.DB_HOST,
            env: ENV,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
    } catch (err) {
        console.log(err);

        dbLogger.error(`Error connecting to the database: ${err}`);
        await client.end();
        process.exit(1);
    }
};
connectToDB();

export const db = drizzle(client, {
    schema: { ...user_schemas, ...product_shemas, ...orders_schemas },
});

if (IS_PRODUCTION) {
    (async () => {
        try {
            await migrate(db, {
                migrationsFolder: 'drizzle',
            });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    })();
    dbLogger.info('Database tables loaded.');
}
