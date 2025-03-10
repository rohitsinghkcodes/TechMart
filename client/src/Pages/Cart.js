import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout.js";
import { useCart } from "../Context/cartContext.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext.js";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import { Select, Space } from "antd";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  // State for unique products
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Update unique products whenever cart changes
    setUniqueProducts(getUniqueProducts());
  }, [cart]);

  const totalCartPrice = () => {
    try {
      let total = 0;
      getUniqueProducts().forEach((product) => {
        total += product.price * product.quantity;
      });
      return total;
    } catch (err) {
      console.log(err);
    }
  };
  const totalCartMRP = () => {
    try {
      let total = 0;
      getUniqueProducts().forEach((product) => {
        total += product.MRP * product.quantity;
      });
      return total;
    } catch (err) {
      console.log(err);
    }
  };

  const getUniqueProducts = () => {
    // Function to get unique products with quantities
    return cart.reduce((acc, product) => {
      const existingProductIndex = acc.findIndex((p) => p._id === product._id);

      if (existingProductIndex !== -1) {
        acc[existingProductIndex].quantity += 1;
      } else {
        acc.push({ ...product, quantity: 1 });
      }

      return acc;
    }, []);
  };

  const updateQuantity = (productId, newQuantity) => {
    // Update quantity in unique products
    const updatedUniqueProducts = uniqueProducts.map((product) =>
      product._id === productId
        ? { ...product, quantity: newQuantity }
        : product
    );

    setUniqueProducts(updatedUniqueProducts);

    // Update cart state with the modified unique products
    const updatedCart = updatedUniqueProducts.reduce((cartArray, product) => {
      const productInstances = Array.from({ length: product.quantity }, () => ({
        ...product,
      }));
      return [...cartArray, ...productInstances];
    }, []);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

  //PAYMENT GATEWAY
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");

      setToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  //MAKE PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout title="Contact | E-Commerce App">
      <div className="container ">
        <div className="row">
          <div className="col-md-12">
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
              <div className="col-12">
                <div className="card bg-dark text-light rounded-5">
                  {auth?.user && auth.user.address && (
                    <>
                      <div className="row px-4 py-3">
                        <div className="col-9">
                          <div className="row">
                            <h5 style={{ color: "gray" }}>
                              Deliver to:{" "}
                              <span style={{ color: "#ffffffde" }}>
                                {auth?.user?.name}
                              </span>
                            </h5>

                            <p style={{ color: "#ffffffbe" }}>
                              {auth?.user?.address}
                            </p>
                          </div>
                        </div>
                        <div className="col-3 d-flex justify-content-end my-auto ">
                          <button
                            className="btn btn-sm btn-outline-warning p-2 rounded-3"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Update Address
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {getUniqueProducts()?.map((product) => (
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
                      Qty:
                      <Space wrap>
                        <Select
                          defaultValue={1}
                          value={product.quantity}
                          style={{ width: 50 }}
                          onChange={(value) =>
                            updateQuantity(product._id, value)
                          }
                          options={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                          ]}
                        />
                      </Space>
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
                  {auth?.user && auth.user.address ? (
                    <div>
                      <hr />
                      <button
                        className="btn btn-danger rounded-5"
                        style={{ width: "80%" }}
                      >
                        Place Order
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to checkout
                    </button>
                  )}
                  <div className="card bg-dark rounded-3 mt-2 text-light">
                    {!token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: token,
                            googlePay: {
                              flow: "checkout",
                              // Add additional Google Pay options if needed
                            },
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                          onError={(error) =>
                            console.error("Drop-In error:", error)
                          }
                        />
                      </>
                    )}

                    <button
                      className="btn btn-warning rounded-5"
                      style={{ width: "80%" }}
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
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
