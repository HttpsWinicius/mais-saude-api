import { Router } from 'express';
import { saveVaccination, updateVaccination, getVaccination } from './vaccination.controller.js';

const router = new Router();

router.post("/", saveVaccination);
router.patch("/check", updateVaccination);
router.get("/", getVaccination);

export default router;