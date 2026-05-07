import React from "react";
import { CandlestickChart } from "lucide-react";

const FearGreedIndex = ({ fearGreedData }) => {
  const getColor = (value) => {
    const num = parseInt(value);
    if (num <= 20) return "#ef4444"; // Red - Extreme Fear
    if (num <= 40) return "#f97316"; // Orange - Fear
    if (num <= 60) return "#eab308"; // Yellow - Neutral
    if (num <= 80) return "#22c55e"; // Green - Greed
    return "#3b82f6"; // Blue - Extreme Greed
  };

  if (!fearGreedData) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="text-center mb-8 rounded-lg flex flex-col md:flex-row items-center justify-center gap-2 rounded-3xl shadow-xl">
        <CandlestickChart size={32} className="text-gray-300" />
        <p className="text-xl text-gray-300">Market Sentiment:</p>
        <p
          className="text-2xl font-semibold"
          style={{ color: getColor(fearGreedData.value) }}
        >
          {fearGreedData.value}%
        </p>
        <p
          className="text-2xl font-semibold"
          style={{ color: getColor(fearGreedData.value) }}
        >
          {fearGreedData.classification}
        </p>
      </div>
    </div>
  );
};

export default FearGreedIndex;
