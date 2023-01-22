export const errorMiddleware = (err, req, res, next) => {
  console.error("Error middleware", err);
  res.status(400).json({message: err.message});
};
