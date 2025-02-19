import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelOrder } from '../redux/orderSlice';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  const handleCancelOrder = (index) => {
    dispatch(cancelOrder(index));
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg shadow">
              <h2 className="text-xl font-bold">Order #{index + 1}</h2>
              <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
              <h3 className="text-lg mt-4">Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between mt-2">
                    <span>{item.title}</span>
                    <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-bold mt-4">Total: ${order.totalAmount.toFixed(2)}</h3>
              <button
                onClick={() => handleCancelOrder(index)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
