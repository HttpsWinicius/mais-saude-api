import { Router } from "express";
import { joiValidate } from "../../middlewares/joiValidate.js";
import { saveVaccination } from "./vaccine.controller.js";

const router = new Router();
router.post("", saveVaccination);

export default router;
