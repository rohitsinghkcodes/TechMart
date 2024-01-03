import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const SearchContext = createContext();

//using the SearchProvider we can use the auth from anywhere throughout the app
const SearchProvider = ({ children }) => {
  //initial auth data
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
//now we can use this useAuth hook anywhere in any component
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
