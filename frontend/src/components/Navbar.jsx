import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-[#e9f2ed] px-10 py-3 bg-white shadow-sm">
      <Link to="/" className="flex items-center gap-3 text-[#0f1a15]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold">FoodConnect</h2>
      </Link>

      <button
        onClick={handleLogout}
        className="h-10 px-4 rounded-xl bg-[#84e5b6] text-sm font-bold text-[#0f1a15] hover:bg-[#6dd9a4] transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
