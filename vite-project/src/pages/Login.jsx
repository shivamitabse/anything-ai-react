import { useState } from "react";
import "./Login.css";
import { loginUser } from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loginMessage, changeLoginMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(data);
    localStorage.setItem("token", res.token);
    if (res.message === "Login successful") {
      navigate("/dashboard");
    } else {
      changeLoginMessage(res.message);
      console.log("login unsuccessful");
    }
  };

  return (
    <div>
      <Navbar />
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button>Login</button>
        <p>{loginMessage}</p>
      </form>
    </div>
  );
}
