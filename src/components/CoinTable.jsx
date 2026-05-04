import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import { Link } from "react-router-dom";

const CoinTable = () => {
  //tanstack query fetching top coins
  const { data, isLoading, error } = useQuery({
    queryKey: ["topCoins"],
    queryFn: fetchTopCoins,
  });

  if (isLoading) {
    return <div>Loading Coins..</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Symbol</th>
            <th className="border border-gray-300 p-2 text-left">Price</th>
            <th className="border border-gray-300 p-2 text-left">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((coin) => (
            <tr key={coin.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                <Link to={`/coins/${coin.id}`}>
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name}
                  </div>
                </Link>
              </td>
              <td className="border border-gray-300 p-2">
                <Link to={`/coins/${coin.id}`}>
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                    {coin.symbol.toUpperCase()}
                  </div>
                </Link>
              </td>

              <td className="border border-gray-300 p-2">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
