import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const RegistrationForm = () => {
  const [userType, setUserType] = useState('vendor');
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobileNumber: '',
    emailAddress: '',
    language: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_type: userType,
          ...formData,
        }),
      });
  
      const data = await response.json();
      console.log("Server response:", data);
      if (response.ok) {
        alert("Registration successful!");
        // optionally, redirect or reset form
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  const languages = [
    { value: '', label: 'Select your preferred language' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  return (
    <div className="min-h-screen w-full bg-[#f9fbfa] font-sans flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between border-b border-[#e9f2ed] px-4 sm:px-6 lg:px-10 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3 text-[#0f1a15]">
          <div className="w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#0f1a15]">FoodConnect</h2>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <a href="/" className="text-[#0f1a15] hover:text-[#559174] transition-colors">Home</a>
          <a href="#" className="text-[#0f1a15] hover:text-[#559174] transition-colors">Suppliers</a>
          <a href="#" className="text-[#0f1a15] hover:text-[#559174] transition-colors">Vendors</a>
          <a href="#" className="text-[#0f1a15] hover:text-[#559174] transition-colors">About</a>
          <a href="#" className="text-[#0f1a15] hover:text-[#559174] transition-colors">Contact</a>
          <button className="h-10 px-4 bg-[#e9f2ed] text-[#0f1a15] rounded-xl text-sm font-bold hover:bg-[#d4e6da] transition-colors">
            Login
          </button>
          <button className="h-10 w-10 bg-[#e9f2ed] rounded-xl flex items-center justify-center hover:bg-[#d4e6da] transition-colors">
            <Globe size={20} className="text-[#0f1a15]" />
          </button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden h-10 w-10 bg-[#e9f2ed] rounded-xl flex items-center justify-center">
          <div className="w-5 h-5 flex flex-col justify-center gap-1">
            <div className="w-full h-0.5 bg-[#0f1a15]"></div>
            <div className="w-full h-0.5 bg-[#0f1a15]"></div>
            <div className="w-full h-0.5 bg-[#0f1a15]"></div>
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 py-8 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="w-full bg-white p-6 sm:p-8 lg:p-12 xl:p-16 rounded-xl shadow-lg">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#0f1a15] mb-6">
            {userType === 'vendor' ? 'Vendor' : 'Supplier'} Registration
          </h1>

          {/* Toggle */}
          <div className="flex bg-[#f0f7f2] border border-[#c9ead7] rounded-xl overflow-hidden max-w-xs mx-auto mb-8">
            {['vendor', 'supplier'].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`flex-1 py-3 px-4 text-base font-bold transition-all duration-200 ${
                  userType === type
                    ? 'bg-[#10b981] text-white shadow-md'
                    : 'text-[#374151] bg-transparent hover:bg-[#e5f3e8] hover:text-[#10b981]'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
            <div className="space-y-6">
              {[
                { label: 'Full Name', name: 'fullName', type: 'text' },
                {
                  label: userType === 'vendor' ? 'Business/Stall Name' : 'Company Name',
                  name: 'businessName',
                  type: 'text'
                },
                { label: 'Mobile Number', name: 'mobileNumber', type: 'tel' },
                { label: 'Email Address', name: 'emailAddress', type: 'email' }
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-base font-medium text-[#374151] mb-3">{label}</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full h-14 px-4 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="block text-base font-medium text-[#374151] mb-3">Preferred Language</label>
                <div className="relative">
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                    className="w-full h-14 px-4 pr-10 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] appearance-none focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
                  >
                    {languages.map(({ value, label }) => (
                      <option key={value} value={value} className="text-[#111827]">{label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6b7280] pointer-events-none" size={20} />
                </div>
              </div>

              {/* Password */}
              {['password', 'confirmPassword'].map((name) => (
                <div key={name}>
                  <label className="block text-base font-medium text-[#374151] mb-3">
                    {name === 'password' ? 'Password' : 'Confirm Password'}
                  </label>
                  <input
                    type="password"
                    name={name}
                    placeholder={name === 'password' ? 'Create a password' : 'Confirm your password'}
                    value={formData[name]}
                    onChange={handleInputChange}
                    minLength="6"
                    required
                    className="w-full h-14 px-4 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-10">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full h-14 bg-[#10b981] text-white rounded-xl font-bold text-lg hover:bg-[#059669] active:bg-[#047857] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Register as {userType === 'vendor' ? 'Vendor' : 'Supplier'}
            </button>
          </div>
          <p className="text-base text-center text-[#6b7280] mt-8">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-[#10b981] underline hover:text-[#059669] transition-colors">Login here</a>
          </p>

          {/* Extra Info */}
          <div className="mt-8 p-6 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl">
            <h3 className="font-semibold text-[#0c4a6e] mb-4 text-lg">
              {userType === 'vendor' ? 'As a Vendor, you will:' : 'As a Supplier, you will:'}
            </h3>
            <ul className="list-disc ml-6 text-[#334155] space-y-2 text-base">
              {userType === 'vendor' ? (
                <>
                  <li>Connect with reliable suppliers</li>
                  <li>Access quality ingredients</li>
                  <li>Track deliveries and manage orders</li>
                  <li>Build your business through FoodConnect</li>
                </>
              ) : (
                <>
                  <li>Connect with vendors across India</li>
                  <li>Showcase your products and services</li>
                  <li>Handle logistics and bulk orders</li>
                  <li>Expand your supplier network</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationForm;