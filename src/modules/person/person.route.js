import { Router } from "express";
import { dbClient } from "../../config/database.js";
import { joiValidate } from "../../middlewares/joiValidate.js";
import { signup, login } from "./person.controller.js";
import { signupSchema } from "./person.schemas.js";

const router = new Router();
router.get("", async (req, res) => {
  const people = await dbClient("tbl_person");
  res.json(people);
});
router.post("/signup", joiValidate(signupSchema), signup);
router.post("/login", login);
// router.get("/", getPerson);
// router.put("/update", updatePerson);

export default router;
