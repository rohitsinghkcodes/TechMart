import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import UserMenu from "../../Components/Layouts/UserMenu";
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
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4 rounded-5 bg-dark text-center">
              <h1>My Orders</h1>

              <div className="shadow-light table-dark mt-2">
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
                          <td className="table-items ">
                            {o?.products?.length}
                          </td>
                          <td style={{ fontWeight: "bold", border:"none" }}>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
