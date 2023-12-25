import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data.success) {
        alert(`✅ ${name} is created`);
        getAllCategories();
      } else {
        alert(`❌ ${data.msg} is created`);
      }
    } catch (err) {
      console.log(err);
      alert(`❌ ${err}`);
    }
  };

  //* GET ALL CATEGORIES FUNCTION
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong in getting categories!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Dashboard - Categories"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Manage Categories</h3>
              <div className="p-3">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>

                          <td>
                            <button className="btn btn-primary">Edit</button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
