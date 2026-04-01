import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://testmysite.in/api/v1/auth/me", {
          credentials: "include", // 🔥 REQUIRED
        });

        const data = await res.json();

        if (data.user) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ while checking
  if (isAuth === null) {
    return <p>Loading...</p>;
  }

  // ✅ authenticated
  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  // ❌ not authenticated
  return children;
}
