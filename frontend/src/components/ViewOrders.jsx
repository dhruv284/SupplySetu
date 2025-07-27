// src/pages/VendorOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const vendorId = localStorage.getItem("user_id"); // Make sure this is set at login

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/vendor/${vendorId}/orders`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch vendor orders:", err);
      }
    };
    fetchOrders();
  }, [vendorId]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700 text-lg">{order.product}</p>
                  <p className="text-sm text-gray-600">Qty: {order.quantity} | Date: {order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOrders;
