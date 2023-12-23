import { useState, useEffect } from "react";
import { useAuth } from "../../Context/authContext.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";




export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async() => {
    try {
      const res = await axios.get("/api/v1/auth/admin-auth");
      console.log('******'+ res.data.ok);

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      // Handle the error (log it, show a user-friendly message, etc.)
      console.error("Error checking admin authentication:", error);
      setOk(false);
    }
  };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  //outlet enables use of nested routing in app.js
  return ok ? <Outlet /> : <Spinner path=""/>
}
