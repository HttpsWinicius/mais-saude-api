import { dbClient } from "../../config/database.js";

export const saveVaccination = async (req, res) => {

  const vaccination = await dbClient("tbl_vaccination").insert(req.body, "*");

  res.json(vaccination);
};

export const updateVaccination = async (req, res) => {

  try {
    await dbClient("tbl_vaccination")
      .where('id_person', "=", req.body.id)
      .update({
        date: req.body.date,
      })

    res.status(204);
  } catch (e) {
    res.status(500).json('Error updated', e.message);
  }


};

export const getVaccination = async (req, res) => {
  const paramsId = 6;

  const data = await dbClient.select('vaccination.id', 'vaccine.name', 'vaccination.date', 'vaccination.schedule_date', 'vaccination.batch', 'vaccination.maker')
    .from('tbl_vaccine as vaccine')
    .innerJoin('tbl_vaccination as vaccination', 'vaccine.id', 'vaccination.id_vaccine')
    .where('vaccination.id_person', paramsId);

  res.json(data);
};
