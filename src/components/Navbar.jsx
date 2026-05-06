import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <ul className="flex space-x-4 w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className="text-white hover:text-gray-300">
              Watchlist
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
