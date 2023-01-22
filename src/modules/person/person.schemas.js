import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string(),
  cpf: Joi.string(),
  birth_date: Joi.date(),
  email: Joi.string(),
  phone: Joi.string(),
  cep: Joi.string(),
  password: Joi.string(),
});
