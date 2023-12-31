import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices.js";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //* GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //*GEt ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-products");
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong in getting products!");
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else getAllProducts();
  }, [checked, radio]);

  //*SETTING FILTERS
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //*GET ALL FILTERS
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //*CLEAR ALL FILTERS
  const clearAllFilters = () => {
    setRadio([]);
    setChecked([]);
  };

  return (
    <Layout title={"All products | Best Offers"}>
      <div className="row mt-3">
        {/* ########### FILTER PART STARTS HERE ########### */}
        <div className="col-md-2">
          <h4 className="mt-3 ms-3">Filter By Category</h4>
          <div className="d-flex flex-column md-3 ms-3">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                value={c.name}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="mt-3 ms-3">Filter By Price</h4>
          <Radio.Group
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="md-3 ms-3"
          >
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          <button className="btn btn-danger m-3" onClick={clearAllFilters}>
            Clear Filters
          </button>
        </div>
        {/* ########### FILTER PART ENDS HERE ########### */}
        {/* ########### PRODUCT PART STARTS HERE ########### */}
        <div className="col-md-10">
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products?.map((product) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={product._id}
                >
                  <img
                    src={`/api/v1/products/product-image/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h6
                      className="card-title"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        fontSize: "16px",
                      }}
                    >
                      {product.name}
                    </h6>
                    <p
                      className="card-text"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </p>
                    <h6
                      className="card-title"
                      style={{
                        fontSize: "28px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#0f1111",
                          verticalAlign: "super",
                        }}
                      >
                        ₹
                      </span>
                      {product.price}
                      <span
                        className="ms-1"
                        style={{ fontSize: "14px", color: "#565959" }}
                      >
                        MRP:{" "}
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: "13px",
                            color: "#565959",
                          }}
                        >
                          ₹{product.MRP}
                        </span>
                        <span
                          className="ms-1"
                          style={{
                            fontSize: "14px",
                            color: "#0F1111",
                          }}
                        >
                          ({(100 * product.price) / product.MRP}% off)
                        </span>
                      </span>
                    </h6>

                    <button
                      className="btn btn-info mt-2"
                      style={{
                        minWidth: "50%",
                        borderRadius: "16px 0px 0px 16px",
                      }}
                    >
                      More details
                    </button>
                    <button
                      className="btn btn-warning mt-2"
                      style={{
                        minWidth: "50%",
                        borderRadius: "0px 16px 16px 0px",
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center text-secondary mt-5">
                No result found for selected filters
              </h4>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
