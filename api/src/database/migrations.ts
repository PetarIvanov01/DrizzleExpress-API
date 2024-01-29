import 'dotenv/config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const client = new Client({
    connectionString: `postgres://postgres:password@localhost:5432/${process.env.DB_NAME}`,
});

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
