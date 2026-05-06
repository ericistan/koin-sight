import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import { Link } from "react-router-dom";

const CoinTable = ({ coins, isLoading, onAddToWatchlist, onViewDetails }) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse border-b border-white/10">
        <thead className="bg-white/10 backdrop-blur-md">
          <tr>
            <th className="border-b border-white/10 p-2 text-left text-white">Name</th>
            <th className="border-b border-white/10 p-2 text-left text-white">Symbol</th>
            <th className="border-b border-white/10 p-2 text-left text-white">Price</th>
            <th className="border-b border-white/10 p-2 text-left text-white">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin) => (
            <tr key={coin.id} className="border-b border-white/10 hover:bg-white/5 text-white">
              <td className="p-2">
                <Link to={`/coins/${coin.id}`}>
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name}
                  </div>
                </Link>
              </td>
              <td className="p-2">
                <Link to={`/coins/${coin.id}`}>
                  {coin.symbol.toUpperCase()}
                </Link>
              </td>
              <td className="p-2">
                ${coin.current_price?.toLocaleString()}
              </td>
              <td className="p-2">
                ${coin.market_cap?.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
