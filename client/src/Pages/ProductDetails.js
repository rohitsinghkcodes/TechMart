import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { FaTruckFast } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { IoMdCash } from "react-icons/io";
import { IoIosMedal } from "react-icons/io";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { MdSecurity } from "react-icons/md";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getSingleProduct();
    //eslint-disable-next-line
  }, [params?.slug]);

  //*GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-single-product/${params?.slug}`
      );
      if (data?.success) {
        setProduct(data?.product);
        //fetching all similar products
        getSimilarProducts(data?.product._id, data?.product.category._id);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong while getting single product!");
    }
  };

  //* GET SIMILAR PRODUCTS
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/similar-products/${pid}/${cid}`
      );
      if (data?.success) {
        setSimilarProducts(data?.products);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong while getting single product!");
    }
  };

  return (
    <Layout title="Contact | E-Commerce App">
      <div className="m-5">
        <div className="card rounded-5 bg-transparent text-light">
          <div className="row ">
            <div className="col-md-5">
              <img
                src={`/api/v1/products/product-image/${product?._id}`}
                className="rounded-5 img-fluid"
                style={{ width: "600px", height: "600px" }}
                alt={product.name}
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6
                  className="card-title"
                  style={{
                    fontSize: "28px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#a9a9a9",
                      verticalAlign: "super",
                    }}
                  >
                    ₹
                  </span>
                  {product.price}
                  <span
                    className="ms-1"
                    style={{ fontSize: "14px", color: "#a9a9a9" }}
                  >
                    MRP:{" "}
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontSize: "13px",
                        color: "#a9a9a9",
                      }}
                    >
                      ₹{product.MRP ? product.MRP : product.price}
                    </span>
                    <span
                      className="ms-1"
                      style={{
                        fontSize: "18px",
                        color: "rgb(204, 204, 42) ",
                      }}
                    >
                      (
                      {product.MRP
                        ? Math.round(100 - (100 * product.price) / product.MRP)
                        : 0}
                      % off)
                    </span>
                  </span>
                </h6>

                <div className="row text-center bg-transparent mt-4">
                  <div className="col-md-2">
                    <div
                      className="container pt-3 m-2 rounded-4 d-flex flex-column align-items-center"
                      style={{
                        height: "100px",
                        backgroundColor: "rgba(65, 65, 65, 0.285)",
                      }}
                    >
                      <FaTruckFast
                        size="30px"
                        color="wheat"
                        style={{
                          transform: "rotateY(180deg)", // Fix the rotate property
                        }}
                      />
                      <p
                        className="m-0 mt-2" // Add margin to separate the text from the icon
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Free Delivery
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 ">
                    <div
                      className="container pt-3 m-2 rounded-4 d-flex flex-column align-items-center"
                      style={{
                        height: "100px",
                        backgroundColor: "rgba(65, 65, 65, 0.285)",
                      }}
                    >
                      <IoMdCash size="30px" color="wheat" />
                      <p
                        className="m-0 mt-2" // Add margin to separate the text from the icon
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Pay on Delivery
                      </p>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div
                      className="container pt-3 m-2 rounded-4 d-flex flex-column align-items-center"
                      style={{
                        height: "100px",
                        backgroundColor: "rgba(65, 65, 65, 0.285)",
                      }}
                    >
                      <TbTruckReturn size="30px" color="wheat" />

                      <p
                        className="m-0 mt-2" // Add margin to separate the text from the icon
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        10 days replacement
                      </p>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div
                      className="container pt-3 m-2 rounded-4 d-flex flex-column align-items-center"
                      style={{
                        height: "100px",
                        backgroundColor: "rgba(65, 65, 65, 0.285)",
                      }}
                    >
                      <IoIosMedal size="30px" color="wheat" />

                      <p
                        className="m-0 mt-2" // Add margin to separate the text from the icon
                        style={{
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        Top Brand
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div
                      className="container pt-3 m-2 rounded-4 d-flex flex-column align-items-center"
                      style={{
                        height: "100px",
                        backgroundColor: "rgba(65, 65, 65, 0.285)",
                      }}
                    >
                      <RiSecurePaymentLine size="30px" color="wheat" />

                      <p
                        className="m-0 mt-2" // Add margin to separate the text from the icon
                        style={{
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        Secure Transaction
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div
                      className="container pt-3 m-2 rounded-4 d-flex flex-column align-items-center"
                      style={{
                        height: "100px",
                        backgroundColor: "rgba(65, 65, 65, 0.285)",
                      }}
                    >
                      {product &&
                      product.category &&
                      product.category.name.includes("Grooming") ? (
                        <div className="d-flex flex-column align-items-center">
                          <MdOutlineAssignmentReturn
                            size="30px"
                            color="wheat"
                          />
                          <p
                            className="m-0 mt-2"
                            style={{ fontSize: "12px", marginTop: "4px" }}
                          >
                            Non-Returnable
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex flex-column align-items-center">
                          <MdSecurity size="30px" color="wheat" />
                          <p
                            className="m-0 mt-2"
                            style={{ fontSize: "12px", marginTop: "4px" }}
                          >
                            Warranty Available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center d-flex justify-content-between">
                  <button
                    className="btn btn-danger mt-4 ms-2 py-2"
                    style={{
                      width: "45%",
                      borderRadius: "40px",
                    }}
                  >
                    <CiHeart
                      size="25px"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    />{" "}
                    &ensp; Add to wishlist
                  </button>
                  <button
                    className="btn btn-warning mt-4 ms-2 py-2 "
                    style={{
                      width: "45%",
                      borderRadius: "50px",
                    }}
                  >
                    <TiShoppingCart
                      size="25px"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    />{" "}
                    &ensp; Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <hr/>
        <h2 className="mt-4 m-2">Similar products</h2>
        {similarProducts.length<1 && <p className="ms-2 text-">No Similar Product Found</p>}
        <div className="d-flex flex-wrap m-2">
          {similarProducts?.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product.slug}`}
              className="product-link"
            >
              <div
                className="card m-2 product-card2"
                style={{ width: "15rem" }}
              >
                <img
                  src={`/api/v1/products/product-image/${product._id}`}
                  className="product-img"
                  alt={product.name}
                />
                <div className="card-body">
                  <h6 className="card-title" style={{ fontSize: "14px" }}>
                    <b>Price:</b> ₹{product.price} &ensp;&ensp; <b>MRP:</b> ₹
                    {product.MRP}
                  </h6>
                  <h6
                    className="card-title"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      fontSize: "14px",
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
                      fontSize: "14px",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
