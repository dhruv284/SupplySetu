// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import FoodConnectLanding from "./components/FoodConnectLanding";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";

// Dashboard components (to be created)
import AdminDashboard from "./components/AdminDashboard";
import VendorDashboard from "./components/VendorDashboard";
import SupplierDashboard from "./components/SupplierDashboard";
import ViewOrders from "./components/ViewOrders";
import AddProducts from "./components/AddProducts";
import VendorGroups from "./components/VendorGroups";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodConnectLanding />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
      <Route path="/vendor/orders" element={<ViewOrders />} />
      <Route path="/vendor/groups" element={<VendorGroups />} />

      <Route path="/vendor/add-products" element={<AddProducts />} />
     
    </Routes>
  );
}

export default App;
