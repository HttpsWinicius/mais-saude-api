import { dbClient } from "../../config/database.js";

export const signup = async (req, res) => {
  const [personAlreadyExists] = await dbClient("tbl_person").where(
    "cpf",
    req.body.cpf
  );
  if (personAlreadyExists) {
    throw new Error("Usuário já cadastrado.");
  }

  const vaccines = await dbClient("tbl_vaccination");
  const trx = await dbClient.transaction();
  try {
    const [result] = await trx("tbl_person").insert(req.body, ["id"]);
    console.log(req.body);
    console.log(">>>>", result.id);

    const vaccinations = vaccines.map((vaccine) => ({
      id_person: result.id,
      id_vaccine: vaccine.id,
    }));
    await trx("tbl_vaccination").insert(vaccinations);
    await trx.commit();
  } catch (error) {
    console.error("Transaction", error);
    await trx.rollback();
  }

  res.status(201).json({ personId: result.id });
};
