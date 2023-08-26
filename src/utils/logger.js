const fs = require('fs');
const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';

// Ensure log directory exists
const ensureLogDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const combinedFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(info => {
    let message = `${info.timestamp} [${info.level}]`;
    if (info.service) {
      message += ` [${info.service}]`;
    }
    message += `: ${info.message}`;
    return message;
  }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: 'info',
  format: combinedFormat,
  defaultMeta: { service: 'POS' },
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, 'error', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      auditFile: path.join(logDir, 'audit.json')
    }),
    new DailyRotateFile({
      filename: path.join(logDir, 'combined', 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      auditFile: false
    })
  ]
});

// Ensure directories
ensureLogDirectoryExists(path.join(logDir, 'error'));
ensureLogDirectoryExists(path.join(logDir, 'combined'));

// If not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.colorize(),
      winston.format.printf(info => {
        let message = `${info.timestamp} [${info.level}]`;
        if (info.service) {
          message += ` [${info.service}]`;
        }
        message += `: ${info.message}`;
        return message;
      })
    )
  }));
}

module.exports = logger;
