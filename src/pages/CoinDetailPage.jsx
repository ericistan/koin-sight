import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import CoinDetail from "../components/CoinDetail";
import { useParams } from "react-router-dom";
import { fetchCoinById } from "../services/coingecko";
import { useNavigate } from "react-router-dom";

const CoinDetailPage = ({ airTableWatchlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  //this extracts the ID form URL and give name to the variable "id" that we can use in this component

  const { data: coin, isLoading } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
  });

  return (
    <>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-cyan-400 mb-4 text-center">
          {coin?.name || "Loading..."}
        </h1>
        <CoinDetail coin={coin} airTableWatchlist={airTableWatchlist} />
      </div>
    </>
  );
};

export default CoinDetailPage;
