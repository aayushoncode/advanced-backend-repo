import express from "express";
import {
  loginUser,
  logOut,
  myProfile,
  refreshToken,
  registerUser,
  verify_otp,
  verify_User,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verify_User);
router.post("/login", loginUser);
router.post("/verify", verify_otp);
router.get("/me", isAuth, myProfile);
router.post("/refresh", refreshToken);
router.post("/logOut", isAuth, logOut);

export default router;
