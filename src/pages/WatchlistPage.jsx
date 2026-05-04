import React from "react";
import { Link } from "react-router-dom";

const WatchlistPage = ({ watchlist, isLoading }) => {
  if (isLoading) {
    return <div>Loading Watchlist...</div>;
  }

  return (
    <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
        Watchlist
      </h1>
      {watchlist && watchlist.length > 0 ? (
        <ul>
          {watchlist.map((coin) => (
            <Link to={`/coins/${coin.coinId}`}>
              <li key={coin.id} className="border p-4 mb-2 rounded">
                <img
                  src={coin.coinImage}
                  alt={coin.coinName}
                  className="w-10 h-10 inline-block mr-2"
                />
                {coin.coinName}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No coins in watchlist</p>
      )}
    </div>
  );
};

export default WatchlistPage;
