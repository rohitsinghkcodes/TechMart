import React from "react";
import Layout from "../../Components/Layouts/Layout.js";
import AdminMenu from "../../Components/Layouts/AdminMenu.js";
import { useAuth } from "../../Context/authContext.js";
import UserMenu from "../../Components/Layouts/UserMenu.js";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Dashboard | E-Commerce App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name: {auth?.user.name}</h3>
              <h3>User Email: {auth?.user.email}</h3>
              <h3>User Contact: {auth?.user.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
