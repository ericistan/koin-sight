import React from "react";
import CoinTable from "../components/CoinTable";

const HomePage = ({ coins, isLoading }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
        Welcome to KoinSight
      </h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Top 20 Coins
      </h2>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <CoinTable coins={filteredCoins} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
