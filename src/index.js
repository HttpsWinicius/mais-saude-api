import express from "express";
import dotenv from "dotenv";
import notifierRoute from './modules/notifier/notifier.route';

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use("notifier", notifierRoute);

app.listen(() => console.log(`Running on port ${PORT}`));