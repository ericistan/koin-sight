import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import { fetchCoinById } from "../services/coingecko";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  addToWatchlist,
  deleteFromWatchlist,
  fetchWatchlist,
} from "../services/airtable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchCoinMarketChart } from "../services/coingecko";

const CoinDetail = ({ coin, airTableWatchlist }) => {
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);
  const [airTableRecordID, setAirTableRecordID] = React.useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const { data: marketChartData, isLoading: marketChartLoading, isError: chartError } = useQuery({
    queryKey: ["coinMarketChart", coin?.id],
    queryFn: () => fetchCoinMarketChart(coin.id, 365),
    enabled: !!coin?.id,
    staleTime: 7 * 24 * 60 * 60 * 1000,
    gcTime: 30 * 24 * 60 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  return (
    <div>
      <div
        className="flex flex-col max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-6 md:p-8 lg:p-10
      bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl transition-all duration-300 gap-4"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full border-b border-white/20 pb-4">
          <button
            className=" px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-lg transition-all duration-200"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div className="flex flex-row gap-2 items-center justify-end">
            <h3 className="text-white">WATCHLIST :</h3>
            <button
              onClick={() =>
                isInWatchlist
                  ? deleteMutation.mutate(airTableRecordID)
                  : addMutation.mutate({
                      coinId: coin.id,
                      coinName: coin.name,
                      coinImage: coin.image?.large || coin.image,
                    })
              }
              className="cursor-pointer transition-all duration-200 hover:scale-110"
            >
              {" "}
              {isInWatchlist ? (
                <Star className="fill-yellow-400 text-yellow-400 w-8 h-8" />
              ) : (
                <Star className="text-gray-400 w-8 h-8" />
              )}
            </button>
          </div>
        </div>
        {/* <h2 className="text-2xl font-semibold text-white">Market Data</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-full bg-black/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 flex flex-col items-center justify-center transition-all duration-200 shadow-lg space-y-2">
            <p className="text-gray-300 text-lg">
              USD:{" "}
              <span className="text-white font-medium">
                ${coin?.market_data?.current_price?.usd.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-300 text-lg">
              SGD:{" "}
              <span className="text-white font-medium">
                ${coin?.market_data?.current_price?.sgd?.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="h-full bg-black/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 flex flex-col items-center justify-center transition-all duration-200 shadow-lg space-y-2">
            <p className="text-gray-300 text-lg">
              🇺🇸 M.Cap:{" "}
              <span className="text-white font-medium">
                {`${coin?.market_data?.market_cap?.usd?.toLocaleString()} USD`}{" "}
              </span>
            </p>
            <p className="text-gray-300 text-lg">
              🇸🇬 M.Cap :{" "}
              <span className="text-white font-medium">
                {`${coin?.market_data?.market_cap?.sgd?.toLocaleString()} SGD`}
              </span>
            </p>
          </div>

          <div className="h-full bg-black/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 flex flex-col items-center justify-center transition-all duration-200 shadow-lg space-y-2">
            <p className="text-gray-300 text-lg">
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
            <p className="text-gray-300 text-lg">
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
            <p className="text-gray-300 text-lg">
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
        <div className="text-white mt-6">
          <h3 className="font-semibold mb-4">(USD) Monthly Price Chart</h3>
          {marketChartLoading && <p className="text-gray-400">Loading chart...</p>}
          {chartError && (
            <p className="text-gray-400">Chart temporarily unavailable. Try again later.</p>
          )}
          {!marketChartLoading && !chartError && marketChartData && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="time"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2E303D",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#06DF73"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* <div className="w-full p-4 text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl mt-6">
        <h3 className="font-semibold mb-4">Monthly Price Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketChartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2E303D",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#06DF73"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}

      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-6 md:p-8 lg:p-10 mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Description</h2>
        <p className="text-gray-300 text-sm mb-2">
          Launched in:{" "}
          <span className="text-white font-medium">
            {coin?.genesis_date
              ? new Date(coin.genesis_date).getFullYear()
              : "N/A"}
          </span>
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
