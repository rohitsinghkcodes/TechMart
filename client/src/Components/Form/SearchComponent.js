import React from "react";
import { useSearch } from "../../Context/searchContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const SearchComponent = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/products/search/${values.keyword}`
      );
      if (data?.success) {
        setValues({ ...values, results: data });
        navigate("/search");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
  <input
    className="form-control mr-sm-2 rounded-right-5 search-field"
    type="search"
    placeholder="Search "
    aria-label="Search"
    value={values.keyword}
    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    style={{ borderRadius: "20px 0 0 20px", flex: 1 }}
  />
  <button
    className="btn search-btn my-2 my-sm-0"
    style={{ borderRadius: "0 20px 20px 0" }}
    type="submit"
    onClick={handleSubmitBtn}
  >
    <IoSearchOutline />
  </button>
</div>

  );
};

export default SearchComponent;
