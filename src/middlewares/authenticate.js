import { dbClient } from "../config/database.js";
import jwt from "jsonwebtoken";

export const authenticateMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split("Bearer ");
    const decoded = jwt.verify(token, process.env.API_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).send("Token inválido");
  }
};
