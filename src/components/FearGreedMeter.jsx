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
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const latestData = fearGreedData?.data?.[0];
  if (!latestData) {
    return <div>No Fear and Greed Index data available.</div>;
  }

  const score = latestData.value;

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

  return (
    <>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Crypto Fear and Greed Index
        </h2>
        <p>Last updated: {latestData.timestamp}</p>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className={`${getMeterColor(score)} h-6 rounded-full`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="text-center text-gray-700">
          {getMeterLabel(score)} ({score})
        </p>
      </div>

      <div className="flex-1">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`${getColor(score)} h-4 rounded-full`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Fear</span>
          <span>Greed</span>
        </div>
      </div>
    </>
  );
};

export default FearGreedMeter;
