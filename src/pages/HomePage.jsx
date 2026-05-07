import React, { use } from "react";
import CoinTable from "../components/CoinTable";
import FearGreedMeter from "../components/FearGreedMeter";
import ShinyText from "../components/reactBits/ShinyText";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      <div className="mb-8 mt-20 text-5xl md:text-6xl font-bold text-center">
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

      {/* <FearGreedMeter /> */}
      {fearGreedData && (
        <div className="mb-8">
          <div className="text-center mb-8 p-4 bg-white/10 rounded-lg">
            <h2 className="text-2xl text-gray-300">Market Sentiment</h2>
            <p className="text-4xl font-bold text-white mt-4">
              {fearGreedData.value}
            </p>
            <p className="text-green-400">{fearGreedData.classification}</p>
          </div>
        </div>
      )}
      <h2 className="text-lg font-medium text-gray-400 mb-2  text-center">
        View top 20 Cryptocurrencies
      </h2>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full mb-6 px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-gray-500 rounded-2xl text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
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
