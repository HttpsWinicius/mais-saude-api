import { dbClient } from "../../config/database.js";

export const saveVaccination = async (req, res) => {
  const vaccination = await dbClient("tbl_vaccination").insert(req.body, "*");

  res.json(vaccination);
};

export const updateVaccination = async (req, res) => {
  try {
    await dbClient("tbl_vaccination")
      .where(
        "id_person",
        "=",
        req.body.id,
        "id_vaccine",
        "=",
        req.body.idVaccine
      )
      .update({
        date: req.body.date,
      });

    const periodicityVaccine = await getPeriodicity(req.body.idVaccine);

    console.log("periodicityVaccine", periodicityVaccine);

    res.status(200).json("Success Update");
  } catch (e) {
    res.status(500).json("Error updated", e.message);
  }
};

const getPeriodicity = async (idVaccine) => {
  const [result] = await dbClient
    .select("vaccine.periodicity")
    .from("tbl_vaccine as vaccine")
    .where("vaccine.id", idVaccine);

  console.log(result.periodicity);

  return result.periodicity;
};

export const getVaccination = async (req, res) => {
  const data = await dbClient
    .select(
      "vaccination.id",
      "vaccine.name",
      "vaccination.date",
      "vaccination.schedule_date",
      "vaccination.batch",
      "vaccination.maker"
    )
    .from("tbl_vaccine as vaccine")
    .innerJoin(
      "tbl_vaccination as vaccination",
      "vaccine.id",
      "vaccination.id_vaccine"
    )
    .where("vaccination.id_person", req.user);

  res.json(data);
};
