import "./ProductItem.css";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const ProductItem = ({ product }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const { id, name, price, short_description, image_url, category } = product;

  console.log(`${import.meta.env.VITE_API_URL}${image_url}`);

  const onButtonClick = () => {
    addToCart(id);
  };

  return (
    <div className="product-item-div">
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
        Add To Cart
      </button>
    </div>
  );
};

export default ProductItem;
