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
import TrackAnalysis from "./components/TrackAnalysis";
import Vendors from "./components/Vendors";
import BrowseProducts from "./components/BrowseProducts";
import VendorProductCatalogue from "./components/VendorProductCatalogue";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProducts";
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
      <Route path="/vendors" element={<Vendors/>}/>
      <Route path="/vendor/add-products" element={<AddProducts />} />
      <Route path="/vendor/catalog" element={<BrowseProducts />} />
      <Route path="/vendor/catalogue/:categoryId" element={<VendorProductCatalogue />} />
      <Route path="/supplier/add-category" element={<AddCategory />} />
      
      <Route path="/supplier/add-product" element={<AddProduct />} />
      <Route path="/vendor/analytics" element={<TrackAnalysis/>}/>
    </Routes>
  );
}

export default App;
