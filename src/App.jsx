import { fetchTopCoins } from "./services/coingecko";
import React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import CoinDetailPage from "./pages/CoinDetailPage";
import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist } from "./services/airtable";
import MagicRings from "./components/reactBits/MagicRings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist, deleteFromWatchlist } from "./services/airtable";

const App = () => {
  const queryClient = useQueryClient();

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

  const addMutation = useMutation({
    mutationFn: (data) =>
      addToWatchlist(data.coinId, data.coinName, data.coinImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (recordId) => deleteFromWatchlist(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return (
    <BrowserRouter>
      <>
        <NavBar />
        <div className="relative min-h-screen ">
          {/* Magic Rings Background - Fixed position behind everything */}
          <div className="fixed inset-0 -z-10 bg-slate-950 pointer-events-none">
            <MagicRings
              color="#66DE7D"
              colorTwo="#70f38a"
              ringCount={8}
              opacity={0.2}
              followMouse={false}
              clickBurst={false}
            />
          </div>
          <div className="relative z-0">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    coins={coins}
                    isLoading={isLoading}
                    airTableWatchlist={airTableWatchlist}
                  />
                }
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
