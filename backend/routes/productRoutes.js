import express from "express";
import { createProductController } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//^ ######## ROUTES ########
//~ CREATE NEW PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//exporting the routers
export default router;
