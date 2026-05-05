import { fetchTopCoins } from "./services/coingecko";
import React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import CoinDetailPage from "./pages/CoinDetailPage";
import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist } from "./services/airtable";
import MagicRings from "./components/MagicRings";

const App = () => {
  const { data: coins, isLoading } = useQuery({
    queryKey: ["topCoins"],
    queryFn: fetchTopCoins,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });

  const { data: airTableWatchlist, isLoading: watchlistLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
  });

  return (
    <BrowserRouter>
      <>
        <div className="relative min-h-screen ">
          {/* Magic Rings Background - Fixed position behind everything */}
          <div className="fixed inset-0 -z-10 bg-slate-950">
            <MagicRings
              color="#fc42ff"
              colorTwo="#42fcff"
              ringCount={6}
              opacity={0.3}
              followMouse={true}
              clickBurst={true}
            />
          </div>
          <div className="relative z-0">
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={<HomePage coins={coins} isLoading={isLoading} />}
              />
              <Route
                path="/watchlist"
                element={
                  <Watchlist
                    airTableWatchlist={airTableWatchlist}
                    isLoading={watchlistLoading}
                  />
                }
              />
              <Route
                path="/coins/:id"
                element={
                  <CoinDetailPage airTableWatchlist={airTableWatchlist} />
                }
              />
            </Routes>
          </div>
        </div>
      </>
    </BrowserRouter>
  );
};

export default App;
