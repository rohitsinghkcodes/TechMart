import React from "react";
import Layout from "../Components/Layouts/Layout.js";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout title="Page Not Found | E-Commerce App">
      <div className="pnf">
        <h1 className="pnf-emoji">☠️</h1>
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
