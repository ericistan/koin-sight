import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[calc(100%-2rem)] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-8 shadow-lg">
        <ul className="flex justify-center items-center space-x-12">
          <li>
            <Link to="/" className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200"
            >
              Watchlist
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
