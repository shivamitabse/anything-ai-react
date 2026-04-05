import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, changeCartItems] = useState([]);

  const addToCart = (item) => {
    changeCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    changeCartItems(cartItems.filter((eachItem) => eachItem != item));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
