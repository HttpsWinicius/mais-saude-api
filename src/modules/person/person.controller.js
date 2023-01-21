import BadRequestError from "../../errors/BadRequestError.js";
import { addDefaultVaccinations } from "../vaccination/vaccination.service.js";

export const signup = async (req, res) => {
  const personAlreadyExists = await checkPersonAlreadyExists(req.body.cpf);
  if (personAlreadyExists) {
    throw new BadRequestError("Usuário já cadastrado.");
  }

  const personId = await createNewPerson(req.body);
  await addDefaultVaccinations(personId);
  res.status(201).json({ personId });
};
