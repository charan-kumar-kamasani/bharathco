import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    const total = storedCart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, []);

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    history.push('/');
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-items">
        {cartItems.map(item => (
          <div key={item.id} className="checkout-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h3>Total: ${totalPrice}</h3>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
