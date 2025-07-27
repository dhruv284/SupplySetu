import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/supplier/category", form);
      if (res.status === 201) {
        setMessage("Category added successfully!");
        setForm({ name: "", description: "" });
      }
    } catch (err) {
      setMessage("Error adding category.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            Add Category
          </button>
          {message && (
            <div className="text-center mt-2 text-sm text-green-600">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
