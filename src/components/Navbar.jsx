import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { fetchCategories } from "../services/api";
import { useSelector } from "react-redux";

const Navbar = ({ onSearchChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <button className="mr-3" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to="/" className="font-bold text-lg text-black">
          BharathGo
        </Link>
      </div>

      <div className="flex-grow flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-4 py-2 w-3/4 md:w-64 rounded border-2 border-gray-300"
        />
      </div>
      <Link to="/cart" className=" md:hidden text-gray-700 w-16">
        🛒 ({totalItemsInCart})
      </Link>
      <div className="hidden md:flex items-center space-x-5 text-red-500">
        {username ? (
          <>
            <span className="text-gray-700">{username}</span>
          </>
        ) : (
          <Link to="/login" className="text-gray-700">
            Login
          </Link>
        )}
        <Link to="/orders" className="text-gray-700">
          My Orders
        </Link>
        <Link to="/my-account" className="text-gray-700">
          My Account
        </Link>
        <Link to="/cart" className="text-gray-700">
          🛒 ({totalItemsInCart})
        </Link>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-50 bg-white shadow-md p-4">
          <Link to="/" className="block py-2">
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name}`}
              className="block py-2"
            >
              {category.name}
            </Link>
          ))}
          <hr className="my-2" />
          <div className=" md:hidden ">
            <>
              {username ? (
                <>
                  <span className="text-gray-700">{username}</span>
                </>
              ) : (
                <Link to="/login" className="text-gray-700">
                  Login
                </Link>
              )}
              <hr className="my-2" />
            </>
          </div>
          <Link to="/orders" className="block py-2 text-gray-700">
            My Orders
          </Link>
          <Link to="/my-account" className="block py-2 text-gray-700">
            My Account
          </Link>
          <Link to="/cart" className="block py-2 text-gray-700">
            Cart ({totalItemsInCart})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
