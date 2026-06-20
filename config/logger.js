import winston, { format, transports } from "winston";
const { combine, timestamp, prettyPrint, json, simple } = format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
    new transports.File({ filename: "logs/error.log", level: "error",  }),
    new transports.File({ filename: "logs/security.log", level: "warn" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: simple(),
    }),
  );
}
