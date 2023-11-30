import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, USER_ADMIN, USER_PASSWORD } from "../config";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { user, password } = req.body;

  if (user !== USER_ADMIN || password !== USER_PASSWORD) {
    return res.status(401).end();
  }

  const token = jwt.sign({ user: USER_ADMIN }, JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  return res.status(200).json({ data: token });
};
