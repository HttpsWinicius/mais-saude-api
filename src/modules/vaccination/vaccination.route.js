import { Router } from 'express';

const router = new Router();

router.post("/", saveVaccination);
router.post("/check", updateVaccination);
router.get("/", getVaccination);


export default router;