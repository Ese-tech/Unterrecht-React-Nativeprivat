// server/src/utils/jwtConfig.ts

import dotenv from "dotenv";

// dotenv konfigurieren
dotenv.config();

// JWT_SECRET als string exportieren mit Validierung
export const JWT_SECRET: string = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET ist nicht in .env definiert");
  }
  return secret;
})();
