// server/src/server.ts

import express from "express";
import { connect } from "./utils/db";
import config from "./config/config";
import { errorHandling } from "./middleware/errorHandling";
import authRoutes from "./routes/authRouter";
import userRoutes from "./routes/userRouter";
import todoRoutes from "./routes/todoRouter";
import cookieParser from "cookie-parser";
import cors from "cors";

// Definiere die erlaubten Origins für CORS
const allowedOrigins = [
  "https://fullstack-frontend-login.onrender.com",
  "http://localhost:8081", // für lokale Entwicklung
];

const app = express();

// Middleware
// Konfiguriere CORS, um Anfragen von den erlaubten Domains zuzulassen
app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Nicht erlaubte Origin: " + origin));
      }
    },
    credentials: true,
  })
);

// Ermögliche die Verarbeitung von JSON-Anfragen
app.use(express.json());
// Ermögliche die Verarbeitung von Cookies
app.use(cookieParser());

// Routen
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes); // Verwende die Todo-Routen

// Einfache Root-Route
app.get("/", (_req, res) => {
  res.json({ message: "Hello from backend" });
});

// Fehlerbehandlungs-Middleware (muss am Ende stehen)
app.use(errorHandling);

// Datenbankverbindung herstellen und Server starten
connect().then(() => {
  app.listen(config.PORT, () =>
    console.log(`Server is running on http://localhost:${config.PORT}`)
  );
}).catch(err => {
    console.error("Fehler beim Starten des Servers:", err);
    process.exit(1);
});