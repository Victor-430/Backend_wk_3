import { logRouteNotFound } from "../loggers/routeNotFoundLogger.js";
import { AppError } from "../utils/AppError.js";

export const routeNotFound = (req, res, next) => {
  logRouteNotFound(req);

  const err = new AppError(`Route not found: ${req.method} ${req.url}`, 404);

  next(err);
};
