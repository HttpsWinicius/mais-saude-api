import { getVaccinationPerson } from "./vaccination.service.js";

export const getVaccination = async (req, res) => {
  const personId = req.user.id;

  // const result = await getVaccinationPerson(personId);

  // return res.status(200).json({ result });
};

export const saveVaccination = (req, res) => {};

export const updateVaccination = (req, res) => {};
