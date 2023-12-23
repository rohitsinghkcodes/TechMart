import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  getSingleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//^ ROUTES
//~ CREATE CATEGORY
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//~ UPDATE CATEGORY
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//~ GET ALL CATEGORIES
router.get("/get-all-category", categoryController);

//~ GET SINGLE CATEGORY
router.get("/get-single-category/:slug", getSingleCategoryController);

//~ DELETE CATEGORY
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

//exporting the routers
export default router;
