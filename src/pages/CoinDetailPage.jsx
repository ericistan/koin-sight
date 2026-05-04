import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import CoinDetail from "../components/CoinDetail";
import { useParams } from "react-router-dom";
import { fetchCoinById } from "../services/coingecko";

const CoinDetailPage = () => {
  const { id } = useParams();

  const {
    data: coin,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
  });

  return (
    <div>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          {coin?.name || "Loading..."}
        </h1>
        <CoinDetail />
      </div>
    </div>
  );
};

export default CoinDetailPage;
