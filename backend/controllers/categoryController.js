import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//* CREATE NEW CATEGORY CONTROLLER
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ msg: "Name is required!" });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(400).send({
        msg: "Category already exists!",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      msg: "New Category Created.",
      category,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error in Category Creation!", err });
  }
};

//* UPDATE CATEGORY CONTROLLER
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      msg: "Category Updated Successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error while updating category!", err });
  }
};

//* GET ALL CATEGORY CONTROLLER
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      msg: "Categories Fetched Successfully!",
      category,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error while fetching categories!", err });
  }
};

//* GET SINGLE CATEGORY CONTROLLER
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      msg: "Category Fetched Successfully!",
      category,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error while fetching category!", err });
  }
};

//* DELETE CATEGORY CONTROLLER
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      msg: "Category Deleted Successfully!",
      category,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error while deleting category!", err });
  }
};
