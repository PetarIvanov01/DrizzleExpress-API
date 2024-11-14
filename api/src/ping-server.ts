import cron from 'node-cron';

let previousStatus: any = null;
let previousTimestamp: any = null;

cron.schedule('*/12 * * * *', async () => {
    try {
        const response = await fetch(
            'https://drizzleexpress-api.onrender.com/health'
        );
        const currentStatus = await response.json();
        const currentTimestamp = new Date().toISOString();

        console.log({
            previousTimestamp,
            currentTimestamp,
            previousStatus,
            currentStatus,
        });

        previousStatus = currentStatus;
        previousTimestamp = currentTimestamp;
    } catch (error) {
        console.error('Error fetching server health:', error);
    }
});
