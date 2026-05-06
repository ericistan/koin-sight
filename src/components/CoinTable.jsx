import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import { Link } from "react-router-dom";

const CoinTable = ({ coins, isLoading, onAddToWatchlist, onViewDetails }) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
      <table className="w-full border-collapse">
        <thead className="bg-white/10 backdrop-blur-xl">
          <tr>
            <th className="border-b border-white/10 p-4 text-left text-white text-sm font-semibold">
              Name
            </th>
            <th className="border-b border-white/10 p-4 text-left text-white text-sm font-semibold">
              Symbol
            </th>
            <th className="border-b border-white/10 p-4 text-left text-white text-sm font-semibold">
              Price
            </th>
            <th className="border-b border-white/10 p-4 text-left text-white text-sm font-semibold">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-white/5 hover:bg-white/10 text-white transition-colors duration-200"
            >
              <td className="p-4">
                <Link to={`/coins/${coin.id}`}>
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name}
                  </div>
                </Link>
              </td>
              <td className="p-4">
                <Link to={`/coins/${coin.id}`}>
                  {coin.symbol.toUpperCase()}
                </Link>
              </td>
              <td className="p-4">${coin.current_price?.toLocaleString()}</td>
              <td className="p-4">${coin.market_cap?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
