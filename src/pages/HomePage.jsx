import React, { use } from "react";
import CoinTable from "../components/CoinTable";
import ShinyText from "../components/reactBits/ShinyText";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { useQuery } from "@tanstack/react-query";
import { CandlestickChart } from "lucide-react";

const HomePage = ({
  coins,
  isLoading,
  airTableWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const { data: fearGreedData } = useQuery({
    queryKey: ["fearGreedIndex"],
    queryFn: fetchFearGreedIndex,
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });

  const getColor = (value) => {
    const num = parseInt(value);
    if (num <= 20) return "#ef4444";
    if (num <= 40) return "#f97316";
    if (num <= 60) return "#eab308";
    if (num <= 80) return "#22c55e";
    return "#3b82f6";
  };

  return (
    <div className="w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      <div
        className="mb-8 mt-20 text-5xl md:text-6xl font-bold text-center"
        style={{ fontFamily: "'Bruno Ace SC'" }}
      >
        <ShinyText
          text="K⌾IN SIGHT"
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

      {fearGreedData && (
        <div className="mb-8">
          <div className="text-center mb-8 rounded-lg flex flex-row items-center justify-center gap-2  rounded-3xl shadow-xl">
            <CandlestickChart size={32} className="text-gray-300" />
            <p className="text-xl text-gray-300">Market Sentiment:</p>
            <p
              className="text-2xl font-semibold"
              style={{ color: getColor(fearGreedData.value) }}
            >
              {fearGreedData.value}%
            </p>
            <p
              className="text-2xl font-semibold"
              style={{ color: getColor(fearGreedData.value) }}
            >
              {fearGreedData.classification}
            </p>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search top 20 Cryptocurrencies..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full mb-4 px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-gray-500 rounded-2xl text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
      />
      <CoinTable
        coins={filteredCoins}
        isLoading={isLoading}
        airTableWatchlist={airTableWatchlist}
      />
    </div>
  );
};

export default HomePage;
