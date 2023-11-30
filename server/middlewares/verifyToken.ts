import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const bearerToken = req.headers.authorization;

  const token = bearerToken?.split(" ")[1];

  if (token == null) {
    res.status(401).end();
    return;
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY);

    next();
  } catch (error) {
    res.status(401).end();
  }
};
