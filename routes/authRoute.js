import express from "express";
import {
  registerController,
  loginController,
  testController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//^ ROUTES
//~ REGISTER USERS
router.post("/register", registerController);

//~ LOGIN USERS
router.post("/login", loginController);

//test route
router.get('/test',requireSignIn,isAdmin, testController);

//exporting the routers
export default router;
