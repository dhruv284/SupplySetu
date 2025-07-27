// src/components/AddProducts.jsx

import React, { useState, useEffect } from "react";
import { FaBoxOpen } from "react-icons/fa";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "kg",
    supplier_id: null, // Will be set from localStorage
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setProduct((prev) => ({ ...prev, supplier_id: parseInt(userId) }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/add-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");
        setProduct({
          name: "",
          category: "",
          description: "",
          price: "",
          unit: "kg",
          supplier_id: product.supplier_id,
        });
      } else {
        alert("❌ Failed to add product: " + data.message);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ An error occurred while adding the product.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <FaBoxOpen className="text-green-600 text-3xl" />
          <h2 className="text-3xl font-semibold text-gray-800">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Organic Wheat"
              required
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="e.g. Grains, Vegetables"
              required
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Short details about the product"
              required
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 px-4 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="e.g. 45"
                required
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 transition-all"
              />
            </div>

            <div className="w-40">
              <label className="block text-sm font-medium text-gray-600 mb-1">Unit</label>
              <select
                name="unit"
                value={product.unit}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 transition-all"
              >
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="piece">piece</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white font-medium py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "+ Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
