import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SpecificProduct = () => {
  const { id } = useParams();

  const [productDetails, changeProductDetails] = useState();

  useEffect(() => {
    const getSpecificProduct = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/get-products/${id}`,
      );
      const result = await response.json();

      changeProductDetails(result);
    };
    getSpecificProduct();
  }, []);

  return <div className="specific-product-component">{}</div>;
};

export default SpecificProduct;
