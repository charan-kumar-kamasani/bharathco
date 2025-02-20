import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa"; // Import new icons
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="relative block border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.category.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            {product.category.name}
          </span>
        </div>
        <div className="flex p-4">
          <div className="flex-1 pr-2">
            <h3 className="font-bold text-sm mb-1">{product.title}</h3>
          </div>
          <div className="flex-none w-1/3">
            <p className="text-blue-500 font-semibold text-right">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      {isProductInCart ? (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-md flex items-center">
          <FaCheckCircle size={20} />
        </div>
      ) : (
        <div
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition cursor-pointer"
          onClick={handleAddToCart}
        >
          <FaCartPlus size={24} className="text-gray-700" />{" "}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
