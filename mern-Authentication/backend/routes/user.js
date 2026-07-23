import express from "express";
import {
  loginUser,
  registerUser,
  verify_otp,
  verify_User,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verify_User);
router.post("/login", loginUser);
router.post("/verify", verify_otp);

export default router;
