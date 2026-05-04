import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
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
