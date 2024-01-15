import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const CartContext = createContext();

//using the SearchProvider we can use the auth from anywhere throughout the app
const CartProvider = ({ children }) => {
  //initial auth data
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItems = localStorage.getItem("cart");
    if (existingCartItems) setCart(JSON.parse(existingCartItems));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
//now we can use this useAuth hook anywhere in any component
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
