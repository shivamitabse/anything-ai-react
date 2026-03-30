import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me", {
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

  // ❌ not authenticated
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // ✅ authenticated
  return children;
}
