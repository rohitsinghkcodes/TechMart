import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layouts/Layout.js";
import useCategory from "../hooks/useCategory.js";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title="All Categories | E-Commerce App">
      <div className="container mt-2">
        <h1>All Categories</h1>
        <div className="row mt-4">
          {categories.map((c) => (
            <div className="col-md-6" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-warning m-2">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
