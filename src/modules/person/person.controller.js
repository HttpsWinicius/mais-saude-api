import { dbClient } from "../../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const [personAlreadyExists] = await dbClient("tbl_person").where(
    "cpf",
    req.body.cpf
  );
  if (personAlreadyExists) {
    throw new Error("Usuário já cadastrado.");
  }

  const vaccines = await dbClient("tbl_vaccine");
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const trx = await dbClient.transaction();
  try {
    const [result] = await trx("tbl_person").insert(req.body, ["id"]);

    const vaccinations = vaccines.map((vaccine) => ({
      id_person: result.id,
      id_vaccine: vaccine.id,
    }));
    console.log("vaccinations", vaccinations);
    await trx("tbl_vaccination").insert(vaccinations);
    await trx.commit();
    res.status(201).json({ personId: result.id });
  } catch (error) {
    console.error("Transaction", error);
    await trx.rollback();
    res.status(500).send("Internal Server Error.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [person] = await dbClient("tbl_person").where("email", email);
  if (!person) {
    console.error("User not found");
    throw new Error("Usuário ou senha inválidos.");
  }

  const isRightPassword = await bcrypt.compare(password, person.password);
  if (!isRightPassword) {
    console.error("Wrong password");
    throw new Error("Usuário ou senha inválidos.");
  }

  const payload = { id: person.id };
  const token = jwt.sign(payload, process.env.API_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
