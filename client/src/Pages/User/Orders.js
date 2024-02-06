import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/authContext.js";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      toast.error("Error While Fetching Orders!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - My Orders"}>
      <div className="container container-fluid p-3">
        <div>
          <h1>My Orders</h1>
          <div>
            {orders?.map((o, i) => {
              return (
                <div className="row">
                  <div className=" row bg-dark border border-bottom-0 border-secondary text-white rounded-top-5 m-0 mt-4 pt-4 ">
                    <div className="col">
                      <p3 className="row d-flex justify-content-center order-head">
                        STATUS
                      </p3>
                      <p3 className="row d-flex justify-content-center">
                        {o.status}
                      </p3>
                    </div>
                    <div className="col ">
                      <p3 className="row d-flex justify-content-center order-head">
                        ORDER PLACED
                      </p3>
                      <p3 className="row d-flex justify-content-center">
                        {moment(o?.createdAt).fromNow()}
                      </p3>
                    </div>
                    <div className="col ">
                      <p3 className="row d-flex justify-content-center order-head">
                        SHIP TO
                      </p3>
                      <p3 className="row d-flex justify-content-center">
                        {o.buyer?.name}
                      </p3>
                    </div>
                    <div className="col ">
                      <p3 className="row d-flex justify-content-center order-head">
                        PAYMENT
                      </p3>
                      <p3
                        className={`row d-flex justify-content-center ${
                          o.payment.success ? "text-success" : "text-danger"
                        }`}
                      >
                        {o.payment.success ? "Successful" : "Pending"}
                      </p3>
                    </div>
                    <div className="col-6">
                      <p3 className="row d-flex justify-content-center order-head">
                        ORDER # {o._id}
                      </p3>
                      <p3 className=" order-head d-flex justify-content-center">
                        TOTAL :&ensp;
                        <p className="text-light">
                          ₹ {o.payment.transaction.amount}
                        </p>
                      </p3>
                    </div>
                    <hr className="mt-2" />
                  </div>
                  <div className=" text-light rounded-bottom-5 bg-none  border border-secondary border-top-0 bg-dark pt-3">
                    {o.products.map((product) => (
                      <div
                        className=" row m-2 mt-0 rounded-top-5  text-light flex-row "
                        key={product._id}
                      >
                        <div className="col-md-1 pb-4 d-flex justify-content-end">
                          <img
                            src={`/api/v1/products/product-image/${product?._id}`}
                            className="rounded-3 img-fluid text-start"
                            alt={product.name}
                          />
                        </div>
                        <div className="col-md-5">
                          <div className="text-start mt-1">
                            <p className="card-title">{product.name}</p>
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
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* </table> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
