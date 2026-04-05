import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import ProductItem from "../components/productItem";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  console.log(cartItems);

  return (
    <div>
      {cartItems.map((ei) => (
        <div key={ei.id}>
          <ProductItem product={ei} />
        </div>
      ))}
    </div>
  );
};

export default Cart;
