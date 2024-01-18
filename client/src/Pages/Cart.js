import React from "react";
import Layout from "../Components/Layouts/Layout.js";
import { useCart } from "../Context/cartContext.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext.js";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalCartPrice = () => {
    try {
      let total = 0;
      cart?.map((i) => {
        total = total + i.price;
      });
      return total;
    } catch (err) {
      console.log(err);
    }
  };
  const totalCartMRP = () => {
    try {
      let total = 0;
      cart?.map((i) => {
        total = total + i.MRP;
      });
      return total;
    } catch (err) {
      console.log(err);
    }
  };

  const removeCartItem = (pid) => {
    try {
      toast.info("Item deleted from cart");
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title="Contact | E-Commerce App">
      <div className="container ">
        <div className="row">
          <div className="col-md-12">
            <h1 className=" mt-4">
              {`Hello, ${auth?.token && auth?.user?.name}`}
            </h1>
            <h5>
              {cart?.length >= 1
                ? `You have ${cart?.length} items in your cart. ${
                    auth?.token ? "" : "Please sign in to checkout"
                  }`
                : "Your cart is empty"}
            </h5>
          </div>
          <div className="row mt-2">
            <div className="col-md-8">
              {cart?.map((product) => (
                <div
                  className="card row m-2  rounded-5 bg-dark text-light flex-row "
                  key={product._id}
                >
                  <div className="col-md-2 py-2 d-flex justify-content-end">
                    <img
                      src={`/api/v1/products/product-image/${product?._id}`}
                      className="rounded-5 img-fluid text-center"
                      alt={product.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body product-card">
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
                              color: "#a6a6a6",
                            }}
                          >
                            ₹{product.MRP ? product.MRP : product.price}
                          </span>
                        </span>
                        <span
                          className="ms-1"
                          style={{
                            fontSize: "14px",
                            color: "#3cd200a6",
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
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div
                      className="mt-4  px-4 d-flex justify-content-end"
                      onClick={() => removeCartItem(product._id)}
                    >
                      <MdOutlineDelete
                        color="red"
                        size="25px"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Remove"
                        data-tooltip-place="top"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card row rounded-4 bg-dark text-light flex-row ">
                <div className="text-center p-3">
                  <h3>Cart Summary</h3>
                  <div className="my-2">
                    <hr />
                  </div>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p>
                      Price ({cart.length} {cart.length > 1 ? "items" : "item"}
                      ):
                    </p>
                    <p>₹{totalCartMRP()}</p>
                  </div>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p>Discount:</p>
                    <p style={{ color: "#3cd200" }}>
                      - ₹{totalCartMRP() - totalCartPrice()}
                    </p>
                  </div>
                  <hr className="mt-0" />

                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <p>Total Amount:</p>
                    <p>₹{totalCartPrice()}</p>
                  </div>
                  <div>
                    <hr />
                    <button
                      className="btn btn-danger rounded-5"
                      style={{ width: "80%" }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
