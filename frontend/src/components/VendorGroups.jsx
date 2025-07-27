import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const VendorGroups = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/vendors/suppliers')
    
      .then(res =>{
        console.log("Fetched suppliers:", res.data);
        setSuppliers(res.data.suppliers || [])

      })
        
        
      
      .catch(err => {
        console.error(err);
        setSuppliers([]);
      });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSupplier = (id) => {
    setSelectedSuppliers(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        description,
        supplier_ids: selectedSuppliers
      };
      const res = await axios.post('http://127.0.0.1:5000/api/vendor/add-vendor-group', payload);
      alert(res.data.message);
      setName('');
      setDescription('');
      setSelectedSuppliers([]);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f9fbfa] font-sans py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-14">
        <h2 className="text-3xl font-bold text-[#0f1a15] mb-8 text-center">
          Create Vendor Group
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Group Name */}
          <div>
            <label className="block text-base font-medium text-[#374151] mb-3">Group Name</label>
            <input
              type="text"
              className="w-full h-14 px-4 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Electronics Partners"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-medium text-[#374151] mb-3">Description</label>
            <textarea
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Short description of the vendor group"
            />
          </div>

          {/* Multi-Select Dropdown for Suppliers */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-base font-medium text-[#374151] mb-3">Select Suppliers</label>
            <div
              onClick={() => setDropdownOpen(prev => !prev)}
              className="w-full h-14 px-4 flex items-center justify-between rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] cursor-pointer focus:outline-none"
            >
              {selectedSuppliers.length > 0
                ? `${selectedSuppliers.length} selected`
                : 'Choose suppliers'}
              <span className="ml-2">&#9662;</span>
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-white border border-[#d1d5db] rounded-xl shadow-lg">
                {suppliers.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">No suppliers found.</div>
                ) : (
                  suppliers.map(supplier => (
                    <label
                      key={supplier.id}
                      className="flex items-center px-4 py-2 hover:bg-[#f0fdf4] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={selectedSuppliers.includes(supplier.id)}
                        onChange={() => toggleSupplier(supplier.id)}
                      />
                      {supplier.name} ({supplier.email})
                    </label>
                  ))
                )}
              </div>
            )}
            <p className="text-sm text-[#6b7280] mt-2">Click to select multiple suppliers</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 bg-[#10b981] text-white rounded-xl font-bold text-lg hover:bg-[#059669] active:bg-[#047857] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Add Vendor Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorGroups;
