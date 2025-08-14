
//server/src/middleware/verifyToken.ts

import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt";
import { JWT_SECRET } from "../utils/jwtConfig";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Token aus dem Authorization-Header holen
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createHttpError(401, "Token fehlt oder ungültig");
    }
    const token = authHeader.split(" ")[1];

    // JWT verifizieren und typisieren - mit @ts-ignore für TypeScript-Konflikt
    // @ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Type-Guard für das Payload
    if (typeof decoded === "object" && decoded && "id" in decoded) {
      req.user = decoded as JwtPayload;
      return next();
    } else {
      throw createHttpError(401, "Token-Format ungültig");
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createHttpError(401, "Token ungültig"));
    }
    return next(error);
  }
}

/* 
#
try {
    let token = req.cookies?.token;

    if (!secret) {
      throw new Error("Ungültiges ENV-Variable");
    }
    //1. authheaderr holen und prüfen
    const authHeader = req?.headers?.authorization;

    if (!token || !authHeader || !authHeader.startsWith("Bearer")) {
      return next(createHttpError(401, "Token ist ungültigt oder fehlt"));
    }

    //2. wir trennen Bearer aus dem authHeader
    const token = authHeader.split(" ")[1];

    //if (!decoded || !decoded._id) {
    if (!token) {
      throw createHttpError(401, "Token fehlt");
    }

    //3. wir verifizieren den Token

    const payload = jwt.verify(token, secret) as JwtPayload;

    //4. Wir modifizieren das Anfrage Objekt
    req.user = payload; // !WICHTIG

    return next();
  } catch (e) {
    return next(createHttpError(401, "Token ungültig"));
  }
*/