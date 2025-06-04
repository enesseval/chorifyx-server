import express from "express";
import { loginController, logoutController, signupController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
