import bunyan from 'bunyan';
const logger = bunyan.createLogger({
    name: "applicationLogs",
    streams: [
        {
            level: 'debug',
            stream: process.stdout // log INFO and above to stdout
        },
        {
            level: 'info',
            stream: process.stdout // log INFO and above to stdout
        },
        {
            level: 'error',
            path: 'logs/appError.log' // log ERROR and above to a file
        }
    ]
});

export default logger;

