import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronDown, Globe } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('vendor');
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // 👈 for redirection

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // ✅ Always clear storage BEFORE sending or setting new session info
    localStorage.clear();
  
    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          role,
          email: formData.email,
          password: formData.password
        })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // ✅ Set user session info
        localStorage.setItem("user_id", data.user_id); // Ensure Flask returns correct `user_id`
        localStorage.setItem("role", role);
        alert("Login successful");
  
        // 🔁 Role-based redirection
        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "vendor") navigate("/vendor/dashboard");
        else if (role === "supplier") navigate("/supplier/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Server error");
    }
  };
  

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
          <button className="h-10 px-4 bg-[#e9f2ed] text-[#0f1a15] rounded-xl text-sm font-bold hover:bg-[#d4e6da] transition-colors">Register</button>
          <button className="h-10 w-10 bg-[#e9f2ed] rounded-xl flex items-center justify-center hover:bg-[#d4e6da] transition-colors">
            <Globe size={20} className="text-[#0f1a15]" />
          </button>
        </nav>
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
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 lg:p-12 xl:p-16 rounded-xl shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#0f1a15] mb-6">Login to Your Account</h1>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-base font-medium text-[#374151] mb-3">Login as</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full h-14 px-4 pr-10 text-left bg-[#f9fafb] border border-[#d1d5db] rounded-xl text-base text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10b981] transition-all"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
              </button>
              {showDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-[#d1d5db] rounded-xl shadow-md">
                  {['admin', 'vendor', 'supplier'].map((r) => (
                    <div
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-[#f0f7f2] text-[#374151] cursor-pointer capitalize text-base"
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[#374151] mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b7280]" size={20} />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-[#374151] mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b7280]" size={20} />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#f9fafb] border border-[#d1d5db] text-base text-[#111827] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-[#10b981] text-white rounded-xl font-bold text-lg hover:bg-[#059669] active:bg-[#047857] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <p className="text-base text-center text-[#6b7280] mt-8">
            Don’t have an account?{' '}
            <a href="/register" className="font-semibold text-[#10b981] underline hover:text-[#059669] transition-colors">
              Register now
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
