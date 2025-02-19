import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { addOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);

  console.log("_____cartItems", cartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const order = {
      userId: user.id,
      items: cartItems,
      totalAmount,
      date: new Date(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    
    navigate("/orders");
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quantity</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <img src={item.category.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <span className="ml-2">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                        className="border rounded w-16 px-2"
                      />
                    </td>
                    <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
