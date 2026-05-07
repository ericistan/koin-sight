import { Link, NavLink } from "react-router-dom";
import React from "react";
import { Home, Star } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[calc(100%-2rem)] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full py-4 px-8 shadow-lg">
        <ul className="flex justify-center items-center space-x-12">
          <li>
            <NavLink
              to="/"
              className="flex flex-row gap-2 text-white text-lg font-medium hover:text-green-300 transition-colors duration-200"
            >
              <Home size={24} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watchlist"
              className="flex flex-row gap-2 text-white text-lg font-medium hover:text-green-300 transition-colors duration-200"
            >
              <Star size={24} />
              Watchlist
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
