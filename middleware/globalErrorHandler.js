export const globalErrorHandler = (err, req, res, next) => {
  logGlobalError(err, req);

  console.error(err.stack);
  const statusCode = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
};
