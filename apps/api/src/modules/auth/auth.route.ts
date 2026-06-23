import { Router, type IRouter } from "express";
import * as authController from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router: IRouter = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
