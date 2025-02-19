import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { store } from "./redux/store";
import "./App.css";
import MyAccount from "./pages/MyAccount";

import OrdersPage from "./pages/OrderPage";
import CategoryPage from "./pages/categories/Categories";
import Login from "./pages/Auth";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
            <Route path="/login" element={<Login />} />

            <Route
              path="/my-account"
              element={<ProtectedRoute element={<MyAccount />} />}
            />
            <Route path="/category/:categoryName" element={<CategoryPage />} />

            <Route
              path="/orders"
              element={<ProtectedRoute element={<OrdersPage />} />}
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
