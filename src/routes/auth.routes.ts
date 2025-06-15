import express from "express";
import { getUser, loginController, registerController, resendVerifyCodeController, verifyCodeController } from "../controllers/auth.controller";
import authenticateJWT from "../middlewares/authenticateJWT";
import { asyncHandler } from "../utils/asyncHandler";
import populateUser from "../middlewares/populateUser";

const router = express.Router();

router.post("/register", asyncHandler(registerController));
router.post("/login", asyncHandler(loginController));

router.post("/verify", authenticateJWT, asyncHandler(verifyCodeController));
router.post("/resend", authenticateJWT, asyncHandler(resendVerifyCodeController));

router.get("/user", authenticateJWT, asyncHandler(populateUser), asyncHandler(getUser));

export default router;
