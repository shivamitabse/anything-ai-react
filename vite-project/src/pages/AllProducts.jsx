import { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
import "./AllProducts.css";
import Navbar from "../components/Navbar";

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

  console.log(products, `${import.meta.env.VITE_API_URL}/api/v1/get-products/`);

  const renderProducts = () => {
    return products.length === 0 ? null : (
      <div>
        <Navbar />
        <div className="all-products-div">
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
          <Link to="/cart">
            <button type="button">Checkout</button>
          </Link>
        </div>
      </div>
    );
  };

  return <div className="all-products-component">{renderProducts()}</div>;
};

export default AllProducts;
