import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VendorProductCatalogue = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Simulate logged-in buyer/vendor (retrieved from localStorage or auth context)
  const buyerId = 2; // example: vendor placing order (buyer role)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/categories/${categoryId}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [categoryId]);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setMessage("");
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/api/orders", {
        product_id: selectedProduct.id,
        buyer_id: buyerId, // 👈 NEW: clearly send buyer/vendor placing the order
        quantity: parseFloat(quantity),
      });
      setMessage("Order placed successfully!");
      setSelectedProduct(null);
      setQuantity("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to place order.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Supplier</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Unit</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">{p.supplier_name || "N/A"}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.unit}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleOrderClick(p)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="mt-4 p-4 border bg-white rounded-md shadow">
          <h3 className="text-lg font-semibold mb-2">
            Order: {selectedProduct.name}
          </h3>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </div>
  );
};

export default VendorProductCatalogue;
