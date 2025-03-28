import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProductSection from "./components/ProductSection";
import Filter from "./components/filter";
import Login from "./components/login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductDetails from "./components/Productdetails";
import ProductList from "./components/productList";
import AddProduct from "./components/addProduct";
import "./input.css";
import "./output.css";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [filters, setFilters] = useState({
    name: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  // 🛠 **LocalStorage-д өгөгдөл хадгалах**
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Login хийгдсэн хэрэглэгчийг хадгалах
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const updatedCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // 🛒 **Сагсыг LocalStorage-д хадгалах**
      return updatedCart;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // 🗑 **Сагснаас устгах үед LocalStorage шинэчлэх**
      return updatedCart;
    });
  };

  return (
    <Router>
      <Header isAuthenticated={!!user} setIsAuthenticated={setUser} cartItems={cartItems.length} onLogout={handleLogout} />
      <div className="container mx-auto px-6 py-10 bg-gray-100 rounded-lg shadow-lg">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route
            path="/market"
            element={
              <ProtectedRoute user={user} element={<MarketPage filters={filters} addToCart={addToCart} onFilterChange={handleFilterChange} />} />
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedRoute = ({ user, element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return user ? element : null;
};

const MarketPage = ({ filters, addToCart, onFilterChange }) => (
  <div className="flex gap-6">
    <div className="w-1/4 p-4 bg-gray shadow-lg rounded-lg">
      <Filter onFilterChange={onFilterChange} />
    </div>
    <div className="w-3/4 grid grid-cols-2 gap-6 justify-center p-4 bg-white shadow-lg rounded-lg">
      <ProductSection filters={filters} addToCart={addToCart} />
    </div>
  </div>
);

export default App;
