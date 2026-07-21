import express from "express";
import { registerUser, verify_User } from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verify_User);

export default router;
