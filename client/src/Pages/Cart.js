import React from "react";
import Layout from "../Components/Layouts/Layout.js";
import { useCart } from "../Context/cartContext.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext.js";
import { MdOutlineDelete } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title="Contact | E-Commerce App">
      <div className="container ">
        <div className="row">
          <div className="col-md-12">
            <h1 className=" p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4>
              {cart?.length >= 1
                ? `You have ${cart?.length} items in your cart. ${
                    auth?.token ? "" : "Please sign in to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-9">
              {cart?.map((product) => (
                <div className="card m-2  rounded-5 bg-dark text-light flex-row ">
                  <div className="row ">
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/products/product-image/${product?._id}`}
                        className="rounded-5 img-fluid"
                        style={{ width: "150px" }}
                        alt={product.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
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
                          </span>
                        </h6>
                        <button
                          className="btn btn-danger mt-4 p-2 px-4 text-center d-flex justify-content-center rounded-5"
                          onClick={() => removeCartItem(product._id)}
                        >
                          <MdOutlineDelete size="25px" />
                          Remove item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-3">Checkout | Payment</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
