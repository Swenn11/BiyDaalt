import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";


const Header = ({ isAuthenticated, setIsAuthenticated, cartItems }) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 py-4 shadow-lg w-full sticky top-0 z-50 relative">
      {/* Навигатийн холбоосууд */}
      <div className="flex gap-6 items-center">
        <Link
          to="/home"
          className="text-white text-lg font-semibold transition duration-300 hover:bg-blue-800 hover:shadow-md px-6 py-3 rounded-lg"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white text-lg font-semibold transition duration-300 hover:bg-blue-800 hover:shadow-md px-6 py-3 rounded-lg"
        >
          About
        </Link>
        {isAuthenticated && (
          <Link
            to="/market"
            className="text-white text-lg font-semibold transition duration-300 hover:bg-blue-800 hover:shadow-md px-6 py-3 rounded-lg"
          >
            Market
          </Link>
        )}
        {isAuthenticated && (
          <Link
            to="/cart"
            className="text-white text-lg font-semibold transition duration-300 hover:bg-blue-800 hover:shadow-md px-6 py-3 rounded-lg relative flex items-center"
          >
            <FaShoppingCart size={24} />
            {cartItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full absolute top-2 right-2 shadow-md">
                {cartItems}
              </span>
            )}
          </Link>
        )}
      </div>

      {/* Нэвтрэх / Бүртгүүлэх хэсэг */}
      <div className="absolute right-6 flex gap-4">
        {!isAuthenticated && (
          <button
            onClick={() => navigate("/signup")}
            className="border border-white text-white py-2 px-4 rounded-md font-semibold transition duration-300 hover:bg-white hover:text-blue-700"
          >
            Sign Up
          </button>
        )}
        <button
          onClick={handleAuthClick}
          className={`border border-white text-white py-2 px-4 rounded-md font-semibold transition duration-300 hover:bg-white hover:text-blue-700 ${
            isAuthenticated ? "border-red-500 hover:bg-red-500 hover:text-white" : ""
          }`}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Header;

