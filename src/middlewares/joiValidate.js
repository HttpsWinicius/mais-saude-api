import Joi from "joi";
import BadRequestError from "../errors/BadRequestError.js";

export const joiValidate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  next();
};
