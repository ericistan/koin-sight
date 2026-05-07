import React from "react";
import CoinTable from "../components/CoinTable";
import ShinyText from "../components/reactBits/ShinyText";
import FearGreedIndex from "../components/FearGreedIndex";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { useQuery } from "@tanstack/react-query";

const HomePage = ({ coins, isLoading, airTableWatchlist }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Fetch Crypto Fear & Greed Index API - cached for 1 hour
  const { data: fearGreedData } = useQuery({
    queryKey: ["fearGreedIndex"],
    queryFn: fetchFearGreedIndex,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <div className="w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      {/* Shiny text effect animation */}
      <div
        className="mb-8 mt-20 text-3xl md:text-5xl lg:text-6xl font-bold text-center"
        style={{ fontFamily: "'Bruno Ace SC'" }}
      >
        <ShinyText
          text="K⌾IN SIGHT"
          speed={2}
          delay={0}
          color="#3acb55"
          shineColor="rgb(135, 247, 156)"
          spread={120}
          direction="left"
          yoyo={true}
          pauseOnHover
          disabled={false}
        />
      </div>

      {/* Market Sentiment component*/}
      <FearGreedIndex fearGreedData={fearGreedData} />

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
