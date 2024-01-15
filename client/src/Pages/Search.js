import Layout from "../Components/Layouts/Layout.js";
import React from "react";
import { useSearch } from "../Context/searchContext";
import { Link } from 'react-router-dom'
import { useCart } from "../Context/cartContext.js";

const Search = () => {
  const [values, setValues] = useSearch();
  const[cart, setCart] = useCart();

  return (
    <Layout title={"All products | Search"}>
      <div className="row m-4 ">
        <div className="col-md-10">
          <div style={{ color: "white", margin: "2px" }}>
            {values?.results.length < 1 ? (
              <h4 className="text-start text-secondary mt-5">
                No result found for this search keyword
              </h4>
            ) : (
              <h5>{`Search Results: ${values?.results.length} Products Found`}</h5>
            )}
          </div>
          <div className="d-flex flex-wrap">
            {values?.results.map((product) => (
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
                    style={{height:"18rem"}}
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
                          color: "#0f1111",
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

                    <div className="text-center ">
                        <button
                          className="btn btn-warning rounded-4 mt-2  "
                          style={{
                            minWidth: "95%",
                          }}
                          onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, product])
                            );
                            alert("Item added to cart");
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
