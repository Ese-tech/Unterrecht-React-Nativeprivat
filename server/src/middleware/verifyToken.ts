import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt.js";

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
    
    // ❗ FIXED: Variable umbenennen - authToken statt token
    const authToken = authHeader.split(" ")[1];

    // ❗ FIXED: JWT_SECRET kann undefined sein - Type Guard hinzufügen
    const jwtSecret = config.JWT_SECRET;
    if (!jwtSecret) {
      throw createHttpError(500, "Server-Konfigurationsfehler: JWT_SECRET nicht gesetzt");
    }

    // Jetzt sind authToken und jwtSecret garantiert strings
    const payload = jwt.verify(authToken, jwtSecret);

    // ❗ FIXED: Bessere Type-Prüfung für JWT Payload
    if (typeof payload === "object" && payload && "id" in payload) {
      req.user = payload as JwtPayload;
      return next();
    } else {
      throw createHttpError(401, "Token ungültig - fehlendes ID-Feld");
    }
  } catch (error) {
    return next(createHttpError(401, "Token ungültig"));
  }
}

