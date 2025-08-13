import express from "express";
import { connect } from "./utils/db";
import config from "./config/config";
import { errorHandling } from "./middleware/errorHandling.ts";
import authRoutes from "./routes/authRouter";
import userRoutes from "./routes/userRouter";
import cookieParser from "cookie-parser";
import cors from "cors";

const allowedOrigins = [
  "https://fullstack-frontend-login.onrender.com",
  "http://localhost:8081", // für lokale Entwicklung
];

const app = express();

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

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Hello from backend" });
});

app.use(errorHandling);

connect();
app.listen(config.PORT, () =>
  console.log(`Server is running on http://localhost:${config.PORT}`)
);