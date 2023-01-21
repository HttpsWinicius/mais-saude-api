import CustomError from "../errors/CustomError.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.userMessage });
  }

  res.status(500).send("Internal Server Error");
};
