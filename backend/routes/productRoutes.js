import express from "express";
import { createProductController,getProductsController } from "../controllers/productController.js";
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

//~ GET ALL PRODUCTS
router.get("/get-products", getProductsController);

//exporting the routers
export default router;
