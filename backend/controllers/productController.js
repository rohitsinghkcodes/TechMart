import slugify from "slugify";
import fs from "fs";
import productModel from "../models/productModel.js";

//* CREATE NEW PRODUCT CONTROLLER
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity,MRP, shipping } =
      req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required!" });
      case !description:
        return res.status(500).send({ error: "description is required!" });
      case !price:
        return res.status(500).send({ error: "price is required!" });
      case !category:
        return res.status(500).send({ error: "category is required!" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required!" });
      case !shipping:
        return res.status(500).send({ error: "shipping is required!" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "image is required and should be less than 1MB!" });
    }

    const newProduct = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (image) {
      newProduct.image.data = fs.readFileSync(image.path);
      newProduct.image.contentType = image.type;
    }

    await newProduct.save();

    res.status(201).send({
      success: true,
      msg: "NEW PRODUCT CREATED SUCCESSFULLY",
      newProduct,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error In Product Creation!", err });
  }
};

//* GET ALL PRODUCTS CONTROLLER
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      msg: "ALL PRODUCTS FETCHED SUCCESSFULLY!",
      products_count: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Fetching Products!", err });
  }
};

//* GET SINGLE PRODUCT CONTROLLER
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    if (product) {
      res.status(200).send({
        success: true,
        msg: "PRODUCT FETCHED SUCCESSFULLY!",
        product,
      });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Product not available", err });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Fetching Product!", err });
  }
};

//* GET PRODUCT IMAGE CONTROLLER
export const productImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");

    if (product.image.data) {
      res.set("Contect-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Fetching Product!", err });
  }
};

//* DELETE PRODUCT CONTROLLER
export const deleteProductController = async (req, res) => {
  try {
    const deletedProduct = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-image");
    res.status(200).send({
      success: true,
      msg: "PRODUCT DELETED SUCCESSFULLY!",
      deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Deleting The Product!", err });
  }
};

//* UPDATE PRODUCT CONTROLLER
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity,MRP, shipping } =
      req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required!" });
      case !description:
        return res.status(500).send({ error: "description is required!" });
      case !price:
        return res.status(500).send({ error: "price is required!" });
      case !category:
        return res.status(500).send({ error: "category is required!" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required!" });
      case !shipping:
        return res.status(500).send({ error: "shipping is required!" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "image is required and should be less than 1MB!" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      msg: "PRODUCT DETAILS UPDATED SUCCESSFULLY",
      product,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error In Product Update!", err });
  }
};

//* GET FILTER PRODUCTS CONTROLLER
export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      msg: "PRODUCTS FILTERED SUCCESSFULLY!",
      products,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Filtering Products!", err });
  }
};
