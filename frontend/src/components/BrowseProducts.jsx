import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrowseProducts = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const goToCategory = (id) => {
    navigate(`/vendor/catalogue/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fbfa] p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Browse Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-200"
            onClick={() => goToCategory(cat.id)}
          >
            <h2 className="text-xl font-medium text-gray-700">{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProducts;
