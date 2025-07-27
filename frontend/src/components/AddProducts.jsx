import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    unit: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all categories
    axios
      .get("http://127.0.0.1:5000/api/supplier/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    // Get user_id from localStorage
    const user_id = localStorage.getItem("user_id");
  
    if (!user_id) {
      setMessage("User not logged in.");
      return;
    }
  
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/supplier/product",
        {
          ...form,
          supplier_id: user_id, // Add supplier_id explicitly
        },
        {
          withCredentials: true,
        }
      );
  
      if (res.status === 201) {
        setMessage("Product added successfully!");
        setForm({
          name: "",
          description: "",
          unit: "",
          price: "",
          category_id: "",
        });
      }
    } catch (err) {
      setMessage("Error adding product.");
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit (e.g. kg, litre)"
            value={form.unit}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            Add Product
          </button>

          {message && (
            <div className="text-center mt-2 text-green-600">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
