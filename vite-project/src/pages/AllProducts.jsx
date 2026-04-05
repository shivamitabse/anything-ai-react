import { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
import "./AllProducts.css";
import { resume } from "react-dom/server";

const AllProducts = () => {
  const [products, changeProducts] = useState([]);

  useEffect(() => {
    const getSpecificProduct = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/get-products/`,
      );
      const result = await response.json();
      changeProducts(result);
    };
    getSpecificProduct();
  }, []);

  const renderProducts = () => {
    return products.length === 0 ? null : (
      <div className="all-products-div">
        {products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
        <Link to="/cart">
          <button type="button">Checkout</button>
        </Link>
      </div>
    );
  };

  return <div className="all-products-component">{renderProducts()}</div>;
};

export default AllProducts;
