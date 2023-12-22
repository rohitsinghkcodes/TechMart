import { useState, useEffect } from "react";
import { useAuth } from "../../Context/authContext.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  //outlet enables use of nested routing in app.js
  return ok ? <Outlet /> : <Spinner/>
}
