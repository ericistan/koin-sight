import { fetchTopCoins } from "./services/coingecko";
import React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import CoinDetailPage from "./pages/CoinDetailPage";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const { data: coins, isLoading } = useQuery({
    queryKey: ["topCoins"],
    queryFn: fetchTopCoins,
  });

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<HomePage coins={coins} isLoading={isLoading} />}
          />
          <Route path="/coins/:id" element={<CoinDetailPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
