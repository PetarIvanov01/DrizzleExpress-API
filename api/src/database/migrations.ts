import 'dotenv/config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const client = new Client({
    connectionString: `postgres://my_db_wqey_user:rhmCdivBLuBwqDCM74fTgBFC7MjaIW4g@dpg-cof6ila1hbls73976sgg-a.frankfurt-postgres.render.com/my_db_wqey`,
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
