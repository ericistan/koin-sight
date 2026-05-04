import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import CoinTable from "../components/CoinTable";

const HomePage = () => {
  return (
    <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
        Welcome to KoinSight
      </h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Top 20 Coins
      </h2>
      <CoinTable />
    </div>
  );
};

export default HomePage;
