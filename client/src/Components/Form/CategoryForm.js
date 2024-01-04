import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="row g-2">
      <div className="col-8">
        <input
          type="text"
          className="form-control bg-dark input-field"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="col-4">
        <button type="submit" className="btn btn-primary">
          {value ? "Update" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
