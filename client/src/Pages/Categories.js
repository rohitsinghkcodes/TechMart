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
            <div className="col-md-4 d-flex justify-content-center" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className=" card category-tiles p-5 m-2"
                style={{ minWidth: "50vh" }}
              >
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
