// src/components/BuyerDashboard.jsx

import React from "react";
import { FaShoppingCart, FaHistory } from "react-icons/fa";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Buyer Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-2">
              <FaShoppingCart className="text-purple-600 text-2xl mr-2" />
              <h3 className="text-xl font-semibold text-gray-700">Browse Products</h3>
            </div>
            <p className="text-gray-600">Explore and purchase fresh produce from vendors.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-2">
              <FaHistory className="text-yellow-600 text-2xl mr-2" />
              <h3 className="text-xl font-semibold text-gray-700">Order History</h3>
            </div>
            <p className="text-gray-600">View your previous purchases and track current orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
