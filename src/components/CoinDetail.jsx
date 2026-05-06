import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import { fetchCoinById } from "../services/coingecko";
import { useParams } from "react-router-dom";
import {
  addToWatchlist,
  deleteFromWatchlist,
  fetchWatchlist,
} from "../services/airtable";

const CoinDetail = ({ coin, airTableWatchlist }) => {
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);
  const [airTableRecordID, setAirTableRecordID] = React.useState(null);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (airTableWatchlist && coin) {
      const found = airTableWatchlist.find((item) => item.gecko.id === coin.id);
      if (found) {
        setIsInWatchlist(true);
        setAirTableRecordID(found.id);
      } else {
        setIsInWatchlist(false);
        setAirTableRecordID(null);
      }
    }
  }, [airTableWatchlist, coin]);

  const addMutation = useMutation({
    mutationFn: (data) =>
      addToWatchlist(data.coinId, data.coinName, data.coinImage),
    onSuccess: (response) => {
      setIsInWatchlist(true);
      setAirTableRecordID(response.id);
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (recordId) => deleteFromWatchlist(recordId),
    onSuccess: () => {
      setIsInWatchlist(false);
      setAirTableRecordID(null);
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return (
    <div>
      <div
        className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-6 md:p-8 lg:p-10
      bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl transition-all duration-300"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="h-full bg-black/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 flex flex-col items-center justify-center transition-all duration-200 shadow-lg space-y-2">
            <p className="text-gray-300 text-md">
              Price (USD):{" "}
              <span className="text-white font-medium">
                ${coin?.market_data?.current_price?.usd.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-300 text-md">
              Price (SGD):{" "}
              <span className="text-white font-medium">
                ${coin?.market_data?.current_price?.sgd?.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="h-full bg-black/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 flex flex-col items-center justify-center transition-all duration-200 shadow-lg space-y-2">
            <p className="text-gray-300 text-md">
              Market Cap 🇺🇸:{" "}
              <span className="text-white font-medium">
                {`${coin?.market_data?.market_cap?.usd?.toLocaleString()}`}{" "}
              </span>
            </p>
            <p className="text-gray-300 text-md">
              Market Cap 🇸🇬:{" "}
              <span className="text-white font-medium">
                {`${coin?.market_data?.market_cap?.sgd?.toLocaleString()}`}
              </span>
            </p>
          </div>

          <div className="h-full bg-black/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 flex flex-col items-center justify-center transition-all duration-200 shadow-lg space-y-2">
            <p className="text-gray-300 text-md">
              24h Change:{" "}
              {coin?.market_data?.price_change_percentage_24h ? (
                <span
                  className={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {coin.market_data.price_change_percentage_24h > 0 ? "↑" : "↓"}{" "}
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </span>
              ) : (
                "N/A"
              )}
            </p>
            <p className="text-gray-300 text-md">
              7d Change:{" "}
              {coin?.market_data?.price_change_percentage_7d ? (
                <span
                  className={
                    coin.market_data.price_change_percentage_7d > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {coin.market_data.price_change_percentage_7d > 0 ? "↑" : "↓"}{" "}
                  {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                </span>
              ) : (
                "N/A"
              )}
            </p>
            <p className="text-gray-300 text-md">
              30d Change:{" "}
              {coin?.market_data?.price_change_percentage_30d ? (
                <span
                  className={
                    coin.market_data.price_change_percentage_30d > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {coin.market_data.price_change_percentage_30d > 0 ? "↑" : "↓"}{" "}
                  {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                </span>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-6 md:p-8 lg:p-10 mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Description</h2>
        <p className="text-gray-300 text-sm mb-2">
          Launched in:{" "}
          <span className="text-white font-medium">{coin?.genesis_date}</span>
        </p>
        <div className="flex row mb-4 space-x-6">
          <a
            href={coin?.links?.homepage?.[0]}
            className="text-cyan-400 hover:text-cyan-300 block mb-3 text-sm transition-colors duration-200"
            target="_blank"
          >
            🌐 Website
          </a>
          <a
            href={coin?.links?.whitepaper}
            className="text-cyan-400 hover:text-cyan-300 block text-sm transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 Whitepaper
          </a>
        </div>

        <p className="text-gray-400 mb-4 text-md leading-relaxed whitespace-pre-wrap">
          {coin?.description?.en}
        </p>
      </div>
    </div>
  );
};

export default CoinDetail;
