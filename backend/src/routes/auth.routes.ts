import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  getMe,
  login,
  register,
  resendVerification,
  resetPasswordWithToken,
  updateMe,
  uploadAvatar,
  verificationStatus,
  verifyEmailAddress,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { avatarUpload } from "../middleware/upload";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordWithToken);
router.post("/verify-email", verifyEmailAddress);
router.post("/verification-status", verificationStatus);
router.post("/resend-verification", resendVerification);
router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, updateMe);
router.post("/change-password", authenticate, changeCurrentPassword);
router.post("/avatar", authenticate, avatarUpload.single("avatar"), uploadAvatar);

export default router;
