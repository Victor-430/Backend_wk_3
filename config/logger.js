import { winston, format, transport } from "winston";
const { combine, timestamp, prettyPrint, json, simple } = format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    // new transport.Console(),
    new transport.File({ filename: "logs/app.log" }),
    new transport.File({ filename: "logs/error.log", level: "error",  }),
    new transport.File({ filename: "logs/security.log", level: "warn" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transport.Console({
      format: simple(),
    }),
  );
}
