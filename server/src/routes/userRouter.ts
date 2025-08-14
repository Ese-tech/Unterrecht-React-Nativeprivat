import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkRole } from "../middleware/checkRole";
import { checkPermission } from "../middleware/checkPermission";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

//Alle Routen hier sind nur für die Admins
//router.use(veryfyToken, checkRolle("ADMIN"))

router.get("/", verifyToken, checkRole("ADMIN"), userController.getUsers);
router.get("/:id", verifyToken, checkRole("ADMIN"), userController.getUserById);
router.put(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  userController.updateUserById
);
router.delete(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  userController.deleteUserById
);

export default router;