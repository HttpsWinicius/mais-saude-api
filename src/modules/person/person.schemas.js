import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string(),
  cpf: Joi.string(),
  dateOfBirth: Joi.date(),
  email: Joi.string(),
  phone: Joi.string(),
  zipCode: Joi.string(),
});
