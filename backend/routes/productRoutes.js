import express from "express";
import {
  createProductController,
  getProductsController,
  getSingleProductController,
  productImageController,
  deleteProductController,
  updateProductController,
  filterProductController,
  productCountController,
  productListByPageController,
  searchProductController,
  similarProductController,
  categoryProductController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
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

//~ UPDATE PRODUCT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//~ GET ALL PRODUCTS
router.get("/get-products", getProductsController);

//~ GET SINGLE PRODUCT
router.get("/get-single-product/:slug", getSingleProductController);

//~ GET PRODUCT IMAGE
router.get("/product-image/:pid", productImageController);

//~ DELETE PRODUCT
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//~ FILTER PRODUCTS
router.post("/product-filters", filterProductController);

//~ COUNT PRODUCT
router.get("/product-count", productCountController);

//~ PRODUCTS BY PAGE
router.get("/product-list/:page", productListByPageController);

//~  SEARCH PRODUCTS
router.get("/search/:keyword", searchProductController);

//~  SIMILAR PRODUCTS
router.get("/similar-products/:pid/:cid", similarProductController);

//~  category PRODUCTS
router.get("/category-products/:slug", categoryProductController);

//! PAYMENT ROUTES
//token
router.get("/braintree/token", braintreeTokenController);
//Payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);


//exporting the routers
export default router;
