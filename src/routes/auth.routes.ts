import express from "express";
import { registerController, verifyCodeController } from "../controllers/auth.controller";
import authenticateJWT from "../middlewares/authenticateJWT";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify", authenticateJWT, verifyCodeController);

export default router;
