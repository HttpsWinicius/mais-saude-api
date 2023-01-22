import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import "./config/database.js";
// import notifierRoute from "./modules/notifier/notifier.route";
import personRoutes from "./modules/person/person.route.js";
import vaccineRoutes from "./modules/vaccine/vaccine.route.js";
import vaccinationRoutes from "./modules/vaccination/vaccination.route.js"
import { errorMiddleware } from "./middlewares/error.js";
import { authenticateMiddleware } from "./middlewares/authenticate.js";
import cors from "cors";

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.get("/ok", (req, res) => res.send("Im alive!!!"));
app.use("/person", personRoutes);
app.use(authenticateMiddleware);
app.use("/vaccine", vaccineRoutes);
app.use("/vaccination", vaccinationRoutes)
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
