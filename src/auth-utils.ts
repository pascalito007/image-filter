import * as jwt from "jsonwebtoken";
import { NextFunction } from "connect";
import { Request, Response } from "express";

const secret: string = "hellosecret";

export function generateJWT(user: { name: string }): string {
  return jwt.sign(JSON.stringify(user), secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: "No authorization headers." });
  }

  const token_bearer = req.headers.authorization.split(" ");
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: "Malformed token." });
  }

  const token = token_bearer[1];

  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate." });
    }
    console.log("verified");
    return next();
  });
}
