import { dbClient } from "../../config/database.js";

export const saveVaccination = async (req, res) => {
  const vaccine = await dbClient("tbl_vaccine").insert(req.body, "*");
  res.json(vaccine);
};
