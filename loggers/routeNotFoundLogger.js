import { logger } from "../config/logger";

export const logRouteNotFound = (req) => {
  logger.error({
    type: "ROUTE_NOT_FOUND",
    method: req.method,
    url: req.url,
  });
};
