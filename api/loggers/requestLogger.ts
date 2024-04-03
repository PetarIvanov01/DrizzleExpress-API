import winston from 'winston';

const { colorize, combine, json, timestamp, simple, printf, label } =
    winston.format;

const requestFormat = printf((props) => {
    const { level, message, timestamp, label } = props;
    return `${timestamp} [${label}] ${level}: "${message}"`;
});

const includeOnlyDebugOrInfoLevel = winston.format((info) => {
    if (info.level === 'debug' || info.level === 'info') {
        return info;
    }
    return false;
});

const requestLogger = winston.loggers.add('requestLogger', {
    format: combine(
        label({ label: 'Request Logger' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json({ space: 3 })
    ),
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: combine(simple(), colorize({ level: true }), requestFormat),
        }),
        new winston.transports.File({
            format: includeOnlyDebugOrInfoLevel(),
            level: 'debug',
            filename: './logs/requests/request.log',
        }),
        new winston.transports.File({
            level: 'warning',
            filename: './logs/requests/errors.log',
        }),
    ],
});

export default requestLogger;
