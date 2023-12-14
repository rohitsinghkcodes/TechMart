import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//^ ROUTES
//~ REGISTER USERS
router.post("/register", registerController);

//~ LOGIN USERS
router.post("/login", loginController);
//exporting the routers
export default router;
