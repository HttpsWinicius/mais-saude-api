import { dbClient } from "../config/database.js";

export const authenticateMiddleware = async (req, res, next) => {
  const [user] = await dbClient("tbl_person").orderBy("createdAt");
  console.log(">>> auth", user);
  req.user = 6;
  next();
};
