import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topCoins"],
    queryFn: fetchTopCoins,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to KoinSight</h1>
      <p>Top Coins:</p>
    </div>
  );
};

export default HomePage;
