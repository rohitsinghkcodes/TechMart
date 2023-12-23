import slugify from "slugify";
import fs from "fs";
import productModel from "../models/productModel.js";

//* CREATE NEW PRODUCT CONTROLLER
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } =
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
