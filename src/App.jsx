import { fetchTopCoins } from "./services/coingecko";
import React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import CoinDetailPage from "./pages/CoinDetailPage";
import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist } from "./services/airtable";

const App = () => {
  const { data: coins, isLoading } = useQuery({
    queryKey: ["topCoins"],
    queryFn: fetchTopCoins,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
    retry: 1, // Only retry once (default is 3)
  });

  const { data: airTableWatchlist, isLoading: watchlistLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
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
          <Route
            path="/watchlist"
            element={
              <Watchlist airTableWatchlist={airTableWatchlist} isLoading={watchlistLoading} />
            }
          />
          <Route
            path="/coins/:id"
            element={<CoinDetailPage airTableWatchlist={airTableWatchlist} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
