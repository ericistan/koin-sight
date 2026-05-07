import { Link, NavLink } from "react-router-dom";
import React from "react";
import { Home, Star } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[calc(100%-2rem)] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-4 md:py-4 md:px-8 shadow-lg">
        <ul className="flex justify-center items-center gap-6 md:gap-12">
          <li>
            <NavLink
              to="/"
              className="flex flex-row gap-2 text-white text-lg font-medium hover:text-green-300 transition-colors duration-200"
              title="Home"
            >
              <Home size={24} />
              <span className="hidden md:inline">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watchlist"
              className="flex flex-row gap-2 text-white text-lg font-medium hover:text-green-300 transition-colors duration-200"
              title="Watchlist"
            >
              <Star size={24} />
              <span className="hidden md:inline">Watchlist</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
