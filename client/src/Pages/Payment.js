import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout.js";
import { useCart } from "../Context/cartContext.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext.js";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const Payment = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  //PAYMENT GATEWAY
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //MAKE PAYMENT
  const handlePayment = () => {};

  return (
    <Layout title="Contact | E-Commerce App">
      <div className="container d-flex justify-content-center ">
        <div className="card bg-dark rounded-5 mt-2 w-50 p-5">
          <DropIn
            options={{
              authorization: clientToken,
            }}
            onInstance={(instance) => setInstance(instance)}
          />
          <button
            className="btn btn-warning rounded-5 mx-5 mt-4"
            onClick={handlePayment}
          >
            Make Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
