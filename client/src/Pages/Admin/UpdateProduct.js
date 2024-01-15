import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;


const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [MRP, setMRP] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  //*GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-single-product/${params.slug}`
      );
      if (data?.success) {
        setName(data?.product.name);
        setId(data?.product._id);
        setDescription(data?.product.description);
        setPrice(data?.product.price);
        setCategory(data?.product.category._id);
        setQuantity(data?.product.quantity);
        setShipping(data?.product.shipping);
        setMRP(data?.product.MRP);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while getting single product!");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

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

  //*handle Update Product Button
  const handleUpdateProductBtn = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("MRP", MRP);
      image && productData.append("image", image);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
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
      toast.error("Something Went Wrong In Updating THe Product!");
    }
  };

  //*handle Delete Product Button
  const handleDeleteProductBtn = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.prompt(
        'Type "yes" if you sure, you want to delete this product?'
      );
      if (!confirm) return;
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(`${data?.msg}`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Deleting The Product!");
    }
  };

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Update Product Page</h3>
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select bg-dark form-control input-field mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Change Image"}
                    <input
                      required
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-4">
                  {image ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/products/product-image/${id}`}
                        alt="product"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Product Title</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the name of product"
                    className="form-control bg-dark form-control input-field"
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
                    className="form-control bg-dark form-control input-field"
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
                    className="form-control bg-dark form-control input-field"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Product MRP</label>
                  <input
                    type="number"
                    value={MRP}
                    placeholder="Enter the MRP for this product"
                    className="form-control bg-dark form-control input-field"
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
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-light">Is Shipping?</label>

                  <Select
                    bordered={false}
                    placeholder="Select Shipping Option"
                    size="large"
                    showSearch
                    className="form-select bg-dark form-control input-field mb-3"
                    value={shipping ? "Yes" : "No"}
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <div className="mb-4 ">
                  <button
                    className="btn btn-primary mx-3"
                    onClick={handleUpdateProductBtn}
                  >
                    Update Product
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteProductBtn}
                  >
                    Delete Product
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

export default UpdateProduct;
