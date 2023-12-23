import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext.js";

const Header = () => {
  const [auth, setAuth] = useAuth();

  //clear storage and set auth details after logging out => handled by this funtion
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    //clearing the local storage
    localStorage.removeItem("auth");
    alert("📤 SIGNED OUT SUCCESSFULLY!");
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
            <Link to="/" className="navbar-brand">
              👜 E-COMMERCE APP
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link" href="#">
                  Categories
                </NavLink>
              </li>

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
                <NavLink to="/cart" className="nav-link" href="#">
                  🛒(0)
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
