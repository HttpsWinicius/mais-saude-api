import { Router } from "express";
import { joiValidate } from "../../middlewares/joiValidate.js";
import { createVaccine } from "./vaccine.controller.js";

const router = new Router();
router.post("", createVaccine);
/*router.post("/login", login);
router.get("/", getPerson);
router.put("/update", updatePerson);*/

export default router;
