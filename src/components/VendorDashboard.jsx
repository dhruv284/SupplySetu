// src/components/VendorDashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaPlusCircle,
  FaUsers,
  FaMapMarkerAlt,
  FaRedoAlt,
  FaChartBar,
} from "react-icons/fa";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Vendor Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            to="/vendor/orders"
            icon={<FaClipboardList className="text-blue-600 text-2xl mr-2" />}
            title="View Orders"
            desc="See all orders placed by buyers and update delivery status."
          />

          <DashboardCard
            to="/vendor/add-products"
            icon={<FaPlusCircle className="text-green-600 text-2xl mr-2" />}
            title="Add Products"
            desc="Upload or update your product catalog with pricing."
          />

          <DashboardCard
            to="/vendor/groups"
            icon={<FaUsers className="text-purple-600 text-2xl mr-2" />}
            title="Vendor Groups"
            desc="Join and manage local vendor groups for bulk ordering."
          />

          <DashboardCard
            to="/vendor/delivery"
            icon={<FaMapMarkerAlt className="text-pink-600 text-2xl mr-2" />}
            title="Pickup / Delivery"
            desc="Coordinate pickup points or enable last-mile delivery."
          />

          <DashboardCard
            to="/vendor/recurring-orders"
            icon={<FaRedoAlt className="text-yellow-600 text-2xl mr-2" />}
            title="Recurring Orders"
            desc="Enable and manage weekly recurring orders."
          />

          <DashboardCard
            to="/vendor/analytics"
            icon={<FaChartBar className="text-indigo-600 text-2xl mr-2" />}
            title="Track Analytics"
            desc="Monitor delivery stats, payments, and order trends."
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

export default VendorDashboard;
