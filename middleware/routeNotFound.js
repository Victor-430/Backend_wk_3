const routeNotFound = (req, res, next) => {
  logRouteNotFound(req);

  const err = new Error("Route not found");
  err.status = 404;
  next(err);
};
