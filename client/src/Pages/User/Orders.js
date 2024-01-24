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
        <div className="card p-4 rounded-5 bg-dark text-center">
          <h1 className="mb-5">My Orders</h1>

          <div className="shadow-light table-dark">
            <table className=" table table-dark">
              <thead>
                <tr>
                  <th scope="col" style={{ padding: "20px" }}>
                    #
                  </th>
                  <th scope="col" style={{ padding: "20px" }}>
                    Status
                  </th>
                  <th scope="col" style={{ padding: "20px" }}>
                    Buyer
                  </th>
                  <th scope="col" style={{ padding: "20px" }}>
                    Date
                  </th>
                  <th scope="col" style={{ padding: "20px" }}>
                    Quantity
                  </th>
                  <th scope="col" style={{ padding: "20px" }}>
                    Payment
                  </th>
                </tr>
              </thead>
              {orders?.map((o, i) => {
                return (
                  <tbody>
                    <tr className="">
                      <td className="table-items ">{i + 1}</td>
                      <td className="table-items ">{o?.status}</td>
                      <td className="table-items ">{o?.buyer?.name}</td>
                      <td className="table-items ">
                        {moment(o?.createdAt).fromNow()}
                      </td>
                      <td className="table-items ">{o?.products?.length}</td>
                      <td style={{ fontWeight: "bold", border: "none" }}>
                        {o?.payment.success ? (
                          <p className="text-success">Success</p>
                        ) : (
                          <p className="text-danger">Failed</p>
                        )}
                      </td>
                    </tr>
                   
                  </tbody>
                );
              })}
            </table>
          </div>
          {/* <div className="row">
                      {orders.products.map((product) => (
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
                                        100 -
                                          (100 * product.price) / product.MRP
                                      )
                                    : 0}
                                  % off)
                                </span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
