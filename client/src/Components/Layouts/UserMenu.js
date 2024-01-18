import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group  text-light rounded-5 product-card ">
          <NavLink
            to="/dashboard/user/"
            className="list-group-item-dark list-group-item-action rounded-top-5 py-3 text-light"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item-dark list-group-item-action text-light py-3"
          >
           My Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item-dark list-group-item-action text-light py-3 rounded-bottom-5 "
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
