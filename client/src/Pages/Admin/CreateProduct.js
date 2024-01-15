import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [MRP, setMRP] = useState("");
  const [image, setImage] = useState("");

  //* GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting categories!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //*handle Create Product Button
  const handleCreateProductBtn = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!category) {
      toast.warning("CATEGORY field is empty!");
      return;
    }
    if (!name) {
      toast.warning("NAME field is empty!");
      return;
    }
    if (!description) {
      toast.warning("DESCRIPTION field is empty!");
      return;
    }
    if (!price) {
      toast.warning("PRICE field is empty!");
      return;
    }

    if (!quantity) {
      toast.warning("QUANTITY field is empty!");
      return;
    }
    if (!image) {
      toast.warning("PRICE field is empty!");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/products/create-product",
        productData
      );
      if (data?.success) {
        toast.success(`${data?.msg}`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Creating New Product!");
    }
  };

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Products Page</h3>
              <div className="m-1 ">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  // showSearch
                  className="form-select bg-dark form-control input-field  mb-3 text-light set-categ"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-4">
                  <label className="btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-4">
                  {image && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="form-label ">Product Title</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the name of product"
                    className="bg-dark form-control input-field"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter the description of product"
                    className="bg-dark form-control input-field"
                    style={{ height: "6rem" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">
                    Product Pricing
                  </label>
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter the price of product"
                    className="bg-dark form-control input-field"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Product MRP</label>
                  <input
                    type="number"
                    value={MRP}
                    placeholder="Enter the MRP for this product"
                    className="bg-dark form-control input-field"
                    onChange={(e) => setMRP(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter the quantity of product"
                    className="bg-dark form-control input-field"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label ">Is Shipping?</label>
                  <Select
                    bordered={false}
                    placeholder="Select Shipping Option"
                    size="large"
                    className="form-select  bg-dark form-control input-field mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    placeholderStyle={{ color: "white" }}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </div>
                <div className="mb-4">
                  <button
                    className="btn submit-btn "
                    onClick={handleCreateProductBtn}
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
