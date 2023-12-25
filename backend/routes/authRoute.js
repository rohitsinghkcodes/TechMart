import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//^ ROUTES
//~ REGISTER USERS
router.post("/register", registerController);

//~ LOGIN USERS
router.post("/login", loginController);

//~ FORGOT PPASSWORD USERS
router.post("/forgot-password", forgotPasswordController);

//~ Protected user-route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//~ Protected admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//exporting the routers
export default router;
