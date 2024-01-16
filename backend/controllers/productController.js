import slugify from "slugify";
import fs from "fs";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

//* CREATE NEW PRODUCT CONTROLLER || POST
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, MRP, shipping } =
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
      msg: "New Product Created",
      newProduct,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error In Product Creation!", err });
  }
};

//* ALL PRODUCTS CONTROLLER || GET
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
      msg: "All Products Fetched Successfully!",
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

//* SINGLE PRODUCT CONTROLLER || GET
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    if (product) {
      res.status(200).send({
        success: true,
        msg: "Product Fetched Successfully!",
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

//* PRODUCT IMAGE CONTROLLER || GET
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

//* DELETE PRODUCT CONTROLLER || DELETE
export const deleteProductController = async (req, res) => {
  try {
    const deletedProduct = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-image");
    res.status(200).send({
      success: true,
      msg: "Products Deleted Successfully!",
      deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Deleting The Product!", err });
  }
};

//* UPDATE PRODUCT CONTROLLER || PUT
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, MRP, shipping } =
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
      msg: "Products Details Updated Successfully!",
      product,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error In Product Update!", err });
  }
};

//* GET FILTER PRODUCTS CONTROLLER || GET
export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      msg: "Products Filtered Successfully!",
      products,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Filtering Products!", err });
  }
};

//* PRODUCT COUNT CONTROLLER || GET
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();

    res.status(200).send({
      success: true,
      msg: "Products Counted",
      total,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, msg: "Error While Counting Products!", err });
  }
};

//* PRODUCTS LIST BY PAGE CONTROLLER || GET
export const productListByPageController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;

    const products = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage) // Corrected calculation for skip
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      msg: "All Products in Page Fetched Successfully!",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error While Fetching Products-List by page!",
      err,
    });
  }
};

//* SEARCH PRODUCTS CONTROLLER || GET
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");

    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error While Searching Products!",
      err,
    });
  }
};

//* SIMILAR PRODUCTS CONTROLLER || GET
export const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-image")
      .limit(3)
      .populate("category");

    if (products) {
      res.status(200).send({
        success: true,
        msg: "Similar Products Fetched Successfully!",
        products,
      });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Similar Products Not Found", err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error While Fetching Similar Product!",
      err,
    });
  }
};

//* CATEGORY PRODUCTS CONTROLLER || GET
export const categoryProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });

    const products = await productModel.find({ category }).populate("category");

    if (products) {
      res.status(200).send({
        success: true,
        msg: "Products Fetched Successfully!",
        category,
        products,
      });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Similar Products Not Found", err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error While Fetching Products!",
      err,
    });
  }
};

// // New controller for fetching search suggestions
// export const searchProductSuggestionsController = async (req, res) => {
//   try {
//     const { keyword } = req.params;

//     // Implement your logic to fetch suggestions based on the keyword
//     // For simplicity, this example uses a regex to match product names
//     const suggestions = await productModel
//       .find({ name: { $regex: keyword, $options: 'i' } })
//       .select('name')
//       .limit(5);

//     // Extract suggestion values from the results
//     const suggestionValues = suggestions.map(product => product.name);

//     res.json({ success: true, suggestions: suggestionValues });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };
