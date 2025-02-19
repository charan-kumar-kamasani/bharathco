import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { Heart, ShoppingCart } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const products = await fetchProducts();
      const selectedProduct = products.find((prod) => prod.id.toString() === id);
      setProduct(selectedProduct);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (cartItems.some((item) => item.id === product?.id)) {
      setIsInCart(true);
    }
  }, [cartItems, product]);

  const handleAddToCart = () => {
    if (isInCart) {
      navigate('/cart');
    } else {
      dispatch(addToCart(product));
      setIsInCart(true);
      console.log(`Added ${product.title} to cart`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#F00" /> 
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-6 mt-12">
      <div className="flex-1 mb-6 md:mb-0">
        <img
          src={product.category.image}
          alt={product.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1 md:ml-6">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
        <div className="flex space-x-4">
          <button
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-1" /> 
            {isInCart ? 'Go to Cart' : 'Add to Cart'}
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
            <Heart size={16} className="mr-1" /> Add to Wishlist
          </button>
        </div>
        {isInCart && (
          <p className="mt-2 text-green-500">Item is already in the cart!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
