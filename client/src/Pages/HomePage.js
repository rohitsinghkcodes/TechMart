import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices.js";
import { Link } from "react-router-dom";
import { useCart } from "../Context/cartContext.js";
import { Spin } from "antd";
import { toast } from "react-toastify";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useCart();

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
    getTotal();
    // eslint-disable-next-line
  }, []);

  //*GEt ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setIsLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Something went wrong in getting products!");
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else getAllProducts();
  }, [checked, radio]);

  //*GET TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMoreProducts();
  }, [page]);

  //*GEt LOAD MORE PRODUCTS
  const loadMoreProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setIsLoading(false);
      if (data?.success) {
        setProducts([...products, ...data?.products]);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Something went wrong in loading more products!");
    }
  };

  //*SETTING FILTERS
  const handleFilter = (value, id) => {
    let all = [...checked];
    console.log(value);
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
    toast.info("All filters are cleared");
    setRadio([]);
    setChecked([]);
  };

  //*custom toast
  const CustomToast = ({ message }) => (
    <div className="d-flex justify-content-around">
      <span>{message}</span>
      <a href="/cart">view</a>
    </div>
  );

  return (
    <Layout title={"All products | Best Offers"}>
      <div className="row  mt-3 mx-2">
        {/* ########### FILTER PART STARTS HERE ########### */}
        <div className="col-md-2 ">
          <h4 className="mt-3 ms-3 filter-title">Category</h4>
          <div className="d-flex flex-column filter-items md-3 ms-3">
            {categories.map((c) => (
              <Checkbox
                className="filter-items"
                key={c._id}
                value={c.name}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="mt-3 ms-3 filter-title">Price</h4>
          <Radio.Group
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="md-3 ms-3"
          >
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio className="filter-items" value={p.array}>
                  {p.name}
                </Radio>
              </div>
            ))}
          </Radio.Group>
          <button
            className="btn btn-danger px-4 m-3 rounded-4"
            onClick={clearAllFilters}
          >
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
                  className="card bg-dark m-2 product-card"
                  style={{ width: "18rem" }}
                  key={product._id}
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="product-link"
                  >
                    <img
                      src={`/api/v1/products/product-image/${product._id}`}
                      className="product-img"
                      style={{ height: "18rem", width: "18rem" }}
                      alt={product.name}
                    />
                    <div className="card-body product-card">
                      <h6
                        className="card-title"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          fontSize: "16px",
                          fontWeight: "bold",
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
                            color: "#a6a6a6",
                            verticalAlign: "super",
                          }}
                        >
                          ₹
                        </span>
                        {product.price}
                        <span
                          className="ms-1"
                          style={{ fontSize: "14px", color: "#a6a6a6" }}
                        >
                          MRP:{" "}
                          <span
                            style={{
                              textDecoration: "line-through",
                              fontSize: "13px",
                            }}
                          >
                            ₹{product.MRP ? product.MRP : product.price}
                          </span>
                          <span
                            className="ms-1"
                            style={{
                              fontSize: "14px",
                              color: "#3cd200",
                            }}
                          >
                            (
                            {product.MRP
                              ? Math.round(
                                  100 - (100 * product.price) / product.MRP
                                )
                              : 0}
                            % off)
                          </span>
                        </span>
                      </h6>
                    </div>
                  </Link>

                  <div className="card-body pt-0">
                    <div className="text-center ">
                      <button
                        className="btn btn-warning rounded-4  "
                        style={{
                          minWidth: "95%",
                        }}
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success(
                            <CustomToast message="Item added to cart!" />,
                            {
                              autoClose: 3000, // Adjust as needed
                            }
                          );
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center text-secondary mt-5">
                No result found for selected filters
              </h4>
            )}
          </div>
          <div className="text-center">
            {products &&
              products.length < total &&
              !radio.length &&
              !checked.length &&
              (isLoading ? (
                <Spin size="large" />
              ) : (
                <button
                  className="btn btn-danger rounded-4 px-4  m-5"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {"Load More +"}
                </button>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
