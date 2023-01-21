import knex from "knex";

export const dbClient = knex({
  client: "pg",
  connection: process.env.DB_CONNECTION_STRING,
  searchPath: ["knex", "public"],
});
