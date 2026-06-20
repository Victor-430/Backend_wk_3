import { logger } from "../config/logger.js";

export const logRouteNotFound = (req) => {
  const { method, url } = req;
  logger.error({
    type: "ROUTE_NOT_FOUND",
    method,
    url,
  });
};
