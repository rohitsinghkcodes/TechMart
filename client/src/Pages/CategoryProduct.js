import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";


const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  //*GEt  PRODUCTS BY CATEGORY
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/category-products/${params.slug}`
      );

      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting products!");
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params.slug]);

  return (
    <Layout>
      <div className="container">
        <h2>{category.name} Category</h2>
        <p>{products.length} result found</p>
        <div className="d-flex flex-wrap">
          {products.length > 0 ? (
            products?.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product.slug}`}
                className="product-link"
              >
                <div
                  className="card m-2 bg-dark product-card"
                  style={{ width: "18rem" }}
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
                            color: "#a6a6a6",
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

                    <div className="text-center rounded-5">
                      <button
                        className="btn btn-warning rounded-5  "
                        style={{
                          minWidth: "95%",
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h4 className="text-center text-secondary mt-5">
              No result found for selected filters
            </h4>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
