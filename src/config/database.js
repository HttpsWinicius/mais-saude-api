import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

export const dbClient = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: true,
  },
});
