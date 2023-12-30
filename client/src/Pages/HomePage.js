import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout.js";
import axios from "axios";
import { Link, json } from "react-router-dom";
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
    getAllProducts();
  }, []);

  //*Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  return (
    <Layout title={"All products | Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>

          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center">Filter By Price</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          <div className="d-flex flex-column"></div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
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
                    ₹ {product.name}.00
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
                    ₹ {product.price}.00
                  </h6>
                  <div></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button className="btn btn-primary ">More details</button>
                    <button className="btn btn-danger ">Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
