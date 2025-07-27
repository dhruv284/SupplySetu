// src/components/AdminDashboard.jsx
import React from "react";
import { FaUsers, FaWarehouse } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manage Suppliers */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Manage Suppliers</h3>
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <FaWarehouse className="text-lg" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              View, approve, or reject supplier applications.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Go to Supplier Management
            </button>
          </div>

          {/* Manage Buyers */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Manage Buyers</h3>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <FaUsers className="text-lg" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor buyer registrations and track activity.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Go to Buyer Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
