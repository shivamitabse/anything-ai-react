import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRouteTwo from "./components/ProtectedRouteTwo";
import ProtectedRoute from "./components/ProtectedRoute";
import AllProducts from "./pages/AllProducts";
import SpecificProduct from "./pages/SpecificProduct";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteTwo>
                <Login />
              </ProtectedRouteTwo>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRouteTwo>
                <Register />
              </ProtectedRouteTwo>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:id" element={<SpecificProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
