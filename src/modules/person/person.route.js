import { Router } from "express";
import { signup } from "./person.controller.js";

const router = new Router();
router.post("/signup", signup);
/*router.post("/login", login);
router.get("/", getPerson);
router.put("/update", updatePerson);*/

export default router
