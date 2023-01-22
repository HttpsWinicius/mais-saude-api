import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import "./config/database.js";
// import notifierRoute from "./modules/notifier/notifier.route";
import personRoutes from "./modules/person/person.route.js";
import vaccineRoutes from "./modules/vaccine/vaccine.route.js";
import { errorMiddleware } from "./middlewares/error.js";
import { authenticateMiddleware } from "./middlewares/authenticate.js";

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.get("/ok", (req, res) => res.send("Im alive!!!"));
app.use("/person", personRoutes);
app.use(authenticateMiddleware);
app.use("/vaccine", vaccineRoutes);
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
