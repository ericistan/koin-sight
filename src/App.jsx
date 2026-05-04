import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "./services/greedFearIndex";
import { React, useEffect } from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
