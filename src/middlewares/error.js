export const errorMiddleware = (err, req, res, next) => {
  console.error("Error middleware", err);
  res.status(400).json(err.message);
};
