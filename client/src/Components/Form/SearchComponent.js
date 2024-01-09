import React from "react";
import { useSearch } from "../../Context/searchContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const { data } = await axios.get(
          `/api/v1/products/search/${values.keyword}`
        );
        setValues({ ...values, results: data });
        navigate("/search");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        className="form-control mr-sm-2 rounded-5 search-field"
        type="search"
        placeholder="🔍 Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        onKeyDown={handleKeyPress} // Added event listener for Enter key
        style={{ borderRadius: "20px 0 0 20px", flex: 1 }}
      />
    </div>
  );
};

export default SearchComponent;
