import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/authContext.js";
import SearchComponent from "../Form/SearchComponent.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../Context/cartContext.js";
import { Avatar, Badge, Space } from "antd";
import { BsCart3 } from "react-icons/bs";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const location = useLocation();
  const categories = useCategory();
  //clear storage and set auth details after logging out => handled by this funtion
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    //clearing the local storage
    localStorage.removeItem("auth");
    toast.success("SIGNED OUT SUCCESSFULLY!");
  };

  // Handle th ereload if already on homepage and clicked on the navbar brand
  const handleReload = () => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" onClick={handleReload}>
              👜 E-COMMERCE APP
            </Link>
            <div className="searchBox">
              <SearchComponent />
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* CATEGORIES DROPDOWN STARTS HERE */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link to={`/categories`} className="dropdown-item">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        to={`/category/${c.slug}`}
                        className="dropdown-item"
                        key={c._id}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* CATEGORIES DROPDOWN ENDS HERE */}

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* Making fisrt letter of name capital */}
                      {auth.user.name[0].toUpperCase() +
                        auth.user.name.slice(1)}
                    </NavLink>
                    {/* Dropdown menu */}
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/login"
                          onClick={handleLogOut}
                          className="dropdown-item"
                        >
                          Sign Out
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link " href="#">
                  <Space size="small">
                    <Badge count={cart?.length} color="#a71344" showZero>
                      <BsCart3 color="white" size="20px" />
                      <span>&nbsp;</span>
                    </Badge>
                  </Space>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
