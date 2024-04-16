import 'dotenv/config';
import { Client, ClientConfig } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const ENV = process.env.NODE_ENV;
const options: ClientConfig = ENV?.includes('production')
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
console.log(options);

export const client = new Client(options);

const doMigrate = async () => {
    await client.connect();

    const db = drizzle(client);

    console.log('Start migration');

    await migrate(db, {
        migrationsFolder: 'drizzle',
    })
        .then(() => {
            console.log('Migrations complete!');
        })
        .catch((err) => {
            console.error('Migrations failed!', err);
            process.exit(1);
        });
    await client.end();
};
doMigrate();
