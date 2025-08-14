import dotenv from "dotenv";
dotenv.config();

interface Config {
  PORT: number;
  MONGODB_URL: string;
  FRONTEND_URL: string;
  JWT_SECRET: string;
}

function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Umgebungsvariable ${key} ist nicht gesetzt.`);
  }
  return value!;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || "3006", 10),
  MONGODB_URL: getEnvVar("MONGODB_URL"),
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:8081",
  JWT_SECRET: getEnvVar("JWT_SECRET"),
};

export default config;