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

const CoinDetail = ({ coin, watchlist }) => {
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);
  const [airTableRecordID, setAirTableRecordID] = React.useState(null);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (watchlist && coin) {
      const found = watchlist.find((item) => item.coinId === coin.id);
      if (found) {
        setIsInWatchlist(true);
        setAirTableRecordID(found.id);
      } else {
        setIsInWatchlist(false);
        setAirTableRecordID(null);
      }
    }
  }, [watchlist, coin]);

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
        className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8
      bg-white rounded-lg shadow-md"
      >
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() =>
            isInWatchlist
              ? deleteMutation.mutate(airTableRecordID)
              : addMutation.mutate({
                  coinId: coin.id,
                  coinName: coin.name,
                  coinImage: coin.image.small,
                })
          }
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
        <p>Started in: {coin?.genesis_date}</p>
        <p>
          Price (USD): ${coin?.market_data?.current_price?.usd.toLocaleString()}
        </p>
        <p>
          Price (SGD): $
          {coin?.market_data?.current_price?.sgd?.toLocaleString()}
        </p>
        <p>
          Market Cap:{" "}
          {`USD ${coin?.market_data?.market_cap?.usd?.toLocaleString()}`} /{" "}
          {`SGD ${coin?.market_data?.market_cap?.sgd?.toLocaleString()}`}
        </p>
        <p>
          24h Change:{" "}
          {coin?.market_data?.price_change_percentage_24h ? (
            <span
              className={
                coin.market_data.price_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coin.market_data.price_change_percentage_24h > 0 ? "↑" : "↓"}{" "}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          7d Change:{" "}
          {coin?.market_data?.price_change_percentage_7d ? (
            <span
              className={
                coin.market_data.price_change_percentage_7d > 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coin.market_data.price_change_percentage_7d > 0 ? "↑" : "↓"}{" "}
              {coin.market_data.price_change_percentage_7d.toFixed(2)}%
            </span>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          30d Change:{" "}
          {coin?.market_data?.price_change_percentage_30d ? (
            <span
              className={
                coin.market_data.price_change_percentage_30d > 0
                  ? "text-green-600"
                  : "text-red-600"
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
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-600 mb-4 text-lg">{coin?.description?.en}</p>
      </div>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Links</h2>
        <a
          href={coin?.links?.homepage?.[0]}
          className="text-blue-600 hover:underline block mb-2"
          target="_blank"
        >
          Homepage
        </a>
        <a
          href={coin?.links?.whitepaper}
          className="text-blue-600 hover:underline block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Whitepaper
        </a>
      </div>
    </div>
  );
};

export default CoinDetail;
