import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackAnalysis = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/supplier/track-analysis')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error(err));
  }, []);

  if (suppliers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 text-lg">
        Loading track analysis...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Supplier Order Analysis</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Supplier</th>
              <th className="px-4 py-3 text-left">Business Name</th>
              <th className="px-4 py-3 text-center">Total Orders</th>
              <th className="px-4 py-3 text-center">Completed</th>
              <th className="px-4 py-3 text-center">Pending</th>
              <th className="px-4 py-3 text-center">Unique Products</th>
              <th className="px-4 py-3 text-center">Avg. Rating</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.supplier_id} className="border-t">
                <td className="px-4 py-3">{s.supplier_name}</td>
                <td className="px-4 py-3">{s.business_name}</td>
                <td className="px-4 py-3 text-center">{s.total_orders}</td>
                <td className="px-4 py-3 text-center text-green-600 font-medium">{s.completed_orders}</td>
                <td className="px-4 py-3 text-center text-red-500 font-medium">{s.pending_orders}</td>
                <td className="px-4 py-3 text-center">{s.total_requested_products}</td>
                <td className="px-4 py-3 text-center">
                  {s.average_rating ? `${s.average_rating} ⭐` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackAnalysis;
