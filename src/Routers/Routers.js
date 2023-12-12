import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import ProductDetails from "../Pages/ProductDetails";
import Checkout from "../Pages/Checkout";
import Login from "../Pages/Login";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../Pages/Signup";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Homepage />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="layout" element={<Layout />} />
    </Routes>
  );
};

export default Routers;
