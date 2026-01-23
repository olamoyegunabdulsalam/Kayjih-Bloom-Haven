// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ScrollToHash from "./components/ScrollToHash"; 
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <ScrollToHash />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/admin/reviews" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
