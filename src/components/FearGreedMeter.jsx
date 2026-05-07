import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";

const FearGreedMeter = () => {
  const { data: fearGreedData, isLoading } = useQuery({
    queryKey: ["fearGreedIndex"],
    queryFn: fetchFearGreedIndex,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
    retry: 1, // Only retry once (default is 3)
  });

  if (isLoading) {
    return <div>Loading Fear and Greed Index...</div>;
  }
  if (!fearGreedData) {
    return <div className="text-white text-center">No data available</div>;
  }

  const score = parseInt(fearGreedData.value);

  const getMeterColor = (score) => {
    if (score <= 20) return "bg-red-500";
    if (score <= 40) return "bg-orange-500";
    if (score <= 60) return "bg-yellow-500";
    if (score <= 80) return "bg-green-500";
    return "bg-blue-500";
  };

  const getMeterLabel = (score) => {
    if (score <= 20) return "Extreme Fear";
    if (score <= 40) return "Fear";
    if (score <= 60) return "Neutral";
    if (score <= 80) return "Greed";
    return "Extreme Greed";
  };

  const getColorStyle = (score) => {
    if (score <= 20) return "#ef4444";
    if (score <= 40) return "#f97316";
    if (score <= 60) return "#eab308";
    if (score <= 80) return "#22c55e";
    return "#3b82f6";
  };

  return (
    <>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mb-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-12">
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
            Market Sentiment
          </h2>
          <div className="w-full bg-white/10 rounded-full h-8 mb-4">
            <div
              className="h-8 rounded-full transition-all duration-300"
              style={{
                width: `${score}%`,
                backgroundColor: getColorStyle(score),
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-white">
            <p className="text-lg">{getMeterLabel(score)}</p>
            <p className="text-2xl font-bold">{score}/100</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FearGreedMeter;
