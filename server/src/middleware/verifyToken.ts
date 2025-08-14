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
    const token = authHeader.split(" ")[1];

    // ❗ FIXED: JWT_SECRET Validierung BEVOR jwt.verify()
    if (!config.JWT_SECRET) {
      throw createHttpError(500, "Server-Konfigurationsfehler: JWT_SECRET nicht gesetzt");
    }

    const payload = jwt.verify(token, config.JWT_SECRET);

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