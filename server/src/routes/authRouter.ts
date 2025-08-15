//server/src/routes/authRouter.ts

import { Router } from "express";
import * as authController from "../controllers/authController";
import protect from "../middleware/authMiddleware"; // Use the cookie-compatible middleware

const router = Router();

//Öffenlicht
router.post("/register", authController.register); //public
router.post("/login", authController.login);
router.post("/logout", authController.logout);

//Geschützt (eigene Dateien)
router.get("/profile", protect, authController.getOwnProfile); // eingelogt
router.put("/profile", protect, authController.updateOwnProfile); // eingelogt

export default router;