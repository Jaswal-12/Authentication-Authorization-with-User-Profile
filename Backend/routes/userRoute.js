import express from "express";
import {
  Signup,
  Login,
  Logout,
  Profile,
} from "../controllers/userController.js";

import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);

router.get(
  "/profile",
  isLoggedIn,
  Profile
);

export default router;