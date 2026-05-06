import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinById } from "../services/coingecko";
import BorderGlow from "../components/reactBits/BorderGlow";
import ShinyText from "../components/reactBits/ShinyText";

const WatchlistPage = ({ airTableWatchlist, isLoading }) => {
  if (isLoading) {
    return <div>Loading Watchlist...</div>;
  }

  return (
    <div className="mt-20 max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      <div className="text-6xl md:text-6xl font-semibold text-center mb-8">
        <ShinyText
          text="WATCHLIST"
          speed={2}
          delay={0}
          color="#3acb55"
          shineColor="rgb(126, 230, 145)"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover
          disabled={false}
        />
      </div>
      {airTableWatchlist && airTableWatchlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {airTableWatchlist.map((coin) => (
            <CoinCard key={coin.id} coinId={coin.gecko.id} coin={coin.gecko} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">
            No coins in your watchlist yet
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Add coins from the home page to get started
          </p>
        </div>
      )}
    </div>
  );
};

const CoinCard = ({ coinId, coin }) => {
  const { data: fullCoin } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => fetchCoinById(coinId),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  });

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#0F1323"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={["#c084fc", "#f472b6", "#38bdf8"]}
    >
      <div style={{ padding: "2.5em" }}>
        <Link to={`/coins/${coinId}`}>
          <div className="w-full cursor-pointer text-white flex flex-col items-center justify-center transition-all duration-200 min-h-60">
            <img
              src={fullCoin?.image?.large || coin.image}
              alt={coin.name}
              className="w-24 h-24 mb-4 rounded-full shadow-lg object-cover"
            />
            <span className="text-lg text-center uppercase font-medium">
              {coin.name}
            </span>
          </div>
        </Link>
      </div>
    </BorderGlow>
  );
};

export default WatchlistPage;
