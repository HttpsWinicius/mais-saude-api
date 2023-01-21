import { Router } from "express";
import { joiValidate } from "../../middlewares/joiValidate.js";
import { signup } from "./person.controller.js";
import { signupSchema } from "./person.schemas.js";

const router = new Router();
router.post("/signup", joiValidate(signupSchema), signup);
/*router.post("/login", login);
router.get("/", getPerson);
router.put("/update", updatePerson);*/

export default router;
