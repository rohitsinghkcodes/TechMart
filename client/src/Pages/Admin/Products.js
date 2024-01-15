import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  //   const [image, setImage] = useState("")

  //*GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-products");
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong While Fetching The Product!");
    }
  };

  //*LIFECYCLE METHOD
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid p-3" >
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div>
              <h3 className="text-center">All Products List</h3>
              <div className="d-flex flex-wrap m-2">
                {products?.map((product) => (
                  <Link
                    key={product._id}
                    to={`/dashboard/admin/update-product/${product.slug}`}
                    className="product-link"
                  >
                    <div
                      className="card m-2 bg-dark product-card"
                      style={{ width: "15rem" }}
                    >
                      <img
                        src={`/api/v1/products/product-image/${product._id}`}
                        className="product-img"
                        style={{height:"15rem"}}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h6 className="card-title" style={{ fontSize: "14px" }}>
                          <b>Price:</b> ₹{product.price} &ensp;&ensp;{" "}
                          <b>MRP:</b> ₹{product.MRP}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
