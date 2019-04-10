import { createLogger, format as realFormat, transports } from 'winston';
import { existsSync, mkdirSync,  } from 'fs';

const PATHS = {
  LOG: `${process.cwd()}/logs`,
  LOG_ERROR: `${process.cwd()}/logs/_error.log`,
  LOG_EXCEPTION: `${process.cwd()}/logs/_exceptions.log`,
  LOG_INFO: `${process.cwd()}/logs/_info.log`
};

(() => existsSync(PATHS.LOG) || mkdirSync(PATHS.LOG))();

const { combine, timestamp, printf, colorize } = realFormat;

const format = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

export const logger = createLogger({
  format: combine(
      timestamp(),
      colorize(),
      format
  ),
  transports: [
    new transports.File({
      filename: PATHS.LOG_INFO,
      level: 'info',
      maxFiles: 2,
      maxsize: 5242880
    }),
    new transports.File({
      filename: PATHS.LOG_ERROR,
      level: 'error',
      maxFiles: 2,
      maxsize: 5242880
    }),
    new transports.Console({
      level: 'debug'
    })
  ]
});