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
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = (userData) => setUser(userData);
  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const addToCart = (product) => setCartItems((prev) => [...prev, product]);
  const removeFromCart = (index) => setCartItems(cartItems.filter((_, i) => i !== index));

  return (
    <Router>
      <Header isAuthenticated={!!user} setIsAuthenticated={setUser} cartItems={cartItems.length} />
      <div className="container mx-auto px-6 py-10 bg-gray-100 rounded-lg shadow-lg">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} /> {/* Signup хуудсыг орууллаа */}

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

