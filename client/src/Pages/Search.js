import Layout from "../Components/Layouts/Layout.js";
import React from "react";
import { useSearch } from "../Context/searchContext";

const Search = () => {
  const [values, setValues] = useSearch();

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
              <div
                className="card m-2 product-card"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  src={`/api/v1/products/product-image/${product._id}`}
                  className="product-img"
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
                        ₹{product.MRP ? product.MRP : product.price}
                      </span>
                      <span
                        className="ms-1"
                        style={{
                          fontSize: "14px",
                          color: "#0F1111",
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
