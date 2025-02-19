import { createSlice } from '@reduxjs/toolkit';

const loadOrdersFromLocalStorage = () => {
  const storedOrders = localStorage.getItem('orders');
  return storedOrders ? JSON.parse(storedOrders) : [];
};

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: loadOrdersFromLocalStorage(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    cancelOrder: (state, action) => {
      state.orders = state.orders.filter((_, index) => index !== action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem('orders');
    },
  },
});

export const { addOrder, cancelOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
