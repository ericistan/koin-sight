import React from "react";
import CoinTable from "../components/CoinTable";
import FearGreedMeter from "../components/FearGreedMeter";

const HomePage = ({ coins, isLoading }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-emerald-400 mb-4 text-center">
        Welcome to KoinSight
      </h1>
      {/* <FearGreedMeter /> */}
      <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">
        Top 20 Coins
      </h2>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full mb-4 p-2 border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-gray-400 rounded-lg"
      />
      <CoinTable coins={filteredCoins} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
