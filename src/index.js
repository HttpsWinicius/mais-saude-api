import express from "express";
import dotenv from "dotenv";
import personRoutes from "./modules/person/person.route";

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use("person", personRoutes);

app.listen(() => console.log(`Running on port ${PORT}`));
