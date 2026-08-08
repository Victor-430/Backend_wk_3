import winston, { format, transports } from "winston";
const { combine, timestamp, printf, json, simple, colorize, errors } = format;

//  rewite global error handler to distinguish for operational error and check if err instaance of apperror
// using try catch in service
// in production where would the log be stored? in a file or in a database? if in a file, how would you manage the file size and rotation?

const fileFormat = combine(timestamp(), json(), errors({ stack: true }));

const consoleFormat = combine(
  errors({ stack: true }),
  timestamp(),
  colorize(),
  printf(({ level, message, timestamp, stack, ...meta }) => {
    const base = `${timestamp} [${level}]: ${message}`;
    const extras = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return stack ? `${base} ${extras}\n${stack}` : `${base} ${extras}`;
  }),
);

const onlyLevel = (level) =>
  format((info) => (info.level === level ? info : false))();

export const logger = winston.createLogger({
  level: "info",
  format: fileFormat,
  exitOnError: false,
  transports: [
    new transports.File({
      filename: "logs/app.log",
      format: combine(onlyLevel("info"), fileFormat),
    }),
    new transports.File({
      filename: "logs/error.log",
      format: combine(onlyLevel("error"), fileFormat),
    }),
    new transports.File({
      filename: "logs/security.log",
      format: combine(onlyLevel("warn"), fileFormat),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "logs/rejections.log",
      format: fileFormat,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "logs/exceptions.log",
      format: fileFormat,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
}
