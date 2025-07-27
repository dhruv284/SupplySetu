// src/components/SupplierDashboard.jsx
import Navbar from './Navbar';
import React from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaMapMarkerAlt,
  FaRedoAlt,
  FaStore,
  FaPlusCircle,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";

const SupplierDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Supplier Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            to="/supplier/add-category"
            icon={<FaPlusCircle className="text-indigo-600 text-2xl mr-2" />}
            title="Add/Remove Category"
            desc="Create or delete product categories."
          />

          <DashboardCard
            to="/supplier/add-product"
            icon={<FaBoxOpen className="text-orange-600 text-2xl mr-2" />}
            title="Add/Remove Product"
            desc="Add new products or remove existing ones."
          />

          <DashboardCard
            to="/supplier/complete-orders"
            icon={<FaCheckCircle className="text-teal-600 text-2xl mr-2" />}
            title="Complete Orders"
            desc="Mark customer orders as fulfilled."
          />

          <DashboardCard
            to="/supplier/orders"
            icon={<FaClipboardList className="text-blue-600 text-2xl mr-2" />}
            title="View All Orders"
            desc="See all orders placed for your products."
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, desc, to }) => (
  <Link
    to={to}
    className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition block hover:bg-gray-50"
  >
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{desc}</p>
  </Link>
);

export default SupplierDashboard;
