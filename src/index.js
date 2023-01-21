import express from "express";
import dotenv from "dotenv";
import notifierRoute from './modules/notifier/notifier.route';
import personRoutes from "./modules/person/person.route";

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use("notifier", notifierRoute);
app.use("person", personRoutes);

app.listen(() => console.log(`Running on port ${PORT}`));
