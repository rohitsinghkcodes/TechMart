import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

//using the authProvider we can use the auth from anywhere throughout the app
const AuthProvider = ({ children }) => {
  //initial auth data
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default set axixos property
  axios.defaults.headers.common["Authorization"] = auth?.token;

  //functions in which we can execute multiple functions
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
//now we can use this useAuth hook anywhere in any component
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
