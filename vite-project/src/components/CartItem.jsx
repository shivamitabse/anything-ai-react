import "./CartItem.css";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const CartItem = (product) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const { id, name, price, short_description, image_url, category } =
    product.product;

  const onButtonClick = () => {
    removeFromCart(product);
  };

  return (
    <div className="cart-item">
      <img
        className="product-image"
        src={`${import.meta.env.VITE_API_URL}${image_url}`}
      />
      <p>product id : {`${id}`}</p>
      <p>product name : {`${name}`}</p>
      <p>Category : {`${category}`}</p>
      <p className="price">Price : {`${price}`}</p>
      <p>{`${short_description}`}</p>
      <button type="button" onClick={onButtonClick}>
        Remove From Cart
      </button>
    </div>
  );
};

export default CartItem;
