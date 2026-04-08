import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import "./Cart.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const navigate = useNavigate();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const data = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cartItems),
      },
    ).then((t) => t.json());

    console.log(data);

    if (!data || !data.rpay_order_id) {
      alert("Order creation failed. Please try again.");
      return; // ❌ STOP here
    }

    const options = {
      key: "rzp_live_SYvUkytdormQ7g", // Replace with your Razorpay key_id
      amount: "600",
      currency: "INR",
      name: "TestMySite",
      description: "This is a Test Transaction",
      order_id: data.rpay_order_id, // This is the order_id created in the backend
      handler: async function (response) {
        const data = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(response),
          },
        ).then((t) => t.json());
        if (data.success) {
          navigate("/success", {
            state: { verified: true, payment_id: response.razorpay_payment_id },
          });
        } else {
          navigate("/failure");
        }
      },
      prefill: {
        name: "Shivakumar",
        email: "shivamitabse@gmail.com",
        contact: "9703814761",
      },
      theme: {
        color: "#592dc8",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      <Navbar />
      <div className="main-cart-component">
        <div className="cart-component">
          {cartItems.map((ei) => (
            <div key={ei.id}>
              <CartItem product={ei} />
            </div>
          ))}
        </div>
        <button onClick={displayRazorpay} className="paybutton" type="button">
          Proceed To Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
