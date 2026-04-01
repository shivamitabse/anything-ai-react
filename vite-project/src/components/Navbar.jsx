import "./Navbar.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://testmysite.in/api/v1/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>Task Manager</h2>

      <div>
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>

        {/* ✅ Show email if logged in */}
        {user && <span className="user-email">{user.email}</span>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
