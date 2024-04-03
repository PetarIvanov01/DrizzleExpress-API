import winston from 'winston';

const { colorize, combine, json, timestamp, simple, printf, label } =
    winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Server logger
const serverLogger = winston.loggers.add('serverLogger', {
    level: 'info',
    format: combine(
        label({ label: 'Server Logger' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json({ space: 3 })
    ),
    transports: [
        new winston.transports.Console({
            format: combine(simple(), colorize({ level: true }), myFormat),
        }),
        // new winston.transports.File({
        //     filename: './logs/server/info.log',
        // }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/server/errors.log',
        }),
    ],
});

export default serverLogger;
