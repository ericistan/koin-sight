import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { addToWatchlist, deleteFromWatchlist } from "../services/airtable";
import { Star } from "lucide-react";

const CoinTable = ({ coins, isLoading, airTableWatchlist }) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data) =>
      addToWatchlist(data.coinId, data.coinName, data.coinImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (recordId) => deleteFromWatchlist(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

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
            <th className="border-b border-white/10 p-4 text-left text-white text-sm font-semibold">
              Watchlist
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
              <td className="p-4">
                {(() => {
                  const isInWatchlist = airTableWatchlist?.some(
                    (w) => w.gecko.id === coin.id,
                  );
                  const watchlistRecord = airTableWatchlist?.find(
                    (w) => w.gecko.id === coin.id,
                  );

                  return (
                    <button
                      onClick={() =>
                        isInWatchlist
                          ? deleteMutation.mutate(watchlistRecord.id)
                          : addMutation.mutate({
                              coinId: coin.id,
                              coinName: coin.name,
                              coinImage: coin.image,
                            })
                      }
                      className="cursor-pointer transition-all duration-200 hover:scale-110"
                    >
                      {isInWatchlist ? (
                        <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                      ) : (
                        <Star className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  );
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
