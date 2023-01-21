import express from "express";
import dotenv from "dotenv";
// import notifierRoute from "./modules/notifier/notifier.route";
import personRoutes from "./modules/person/person.route.js";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use("person", personRoutes);

app.use(errorMiddleware);
app.listen(() => console.log(`Running on port ${PORT}`));
