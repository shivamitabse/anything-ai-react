import { useState } from "react";
import "./Register.css";
import { registerUser } from "../services/api";
import Navbar from "../components/Navbar";

export default function Register() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(data);
    alert("Registered Successfully");
  };

  return (
    <div>
      <Navbar />
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
