import React from "react";
import { Link } from "react-router-dom";

const WatchlistPage = ({ airTableWatchlist, isLoading }) => {
  if (isLoading) {
    return <div>Loading Watchlist...</div>;
  }

  return (
    <div className="mt-20 max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-8">
        Your Watchlist
      </h1>
      {airTableWatchlist && airTableWatchlist.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {airTableWatchlist.map((coin) => (
            <Link to={`/coins/${coin.gecko.id}`} key={coin.id}>
              <div className="w-full h-full bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:bg-white/15 cursor-pointer text-white flex flex-col items-center transition-all duration-200 shadow-lg">
                <img
                  src={coin.gecko.image}
                  alt={coin.gecko.name}
                  className="w-8 h-8 inline-block mb-3"
                />
                <span className="text-xs font-medium text-center">
                  {coin.gecko.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // <ul>
        //   {airTableWatchlist.map((coin) => (
        //     <Link to={`/coins/${coin.gecko.id}`}>
        //       <li
        //         key={coin.id}
        //         className="border-b border-white/10 p-4 mb-2 rounded-lg hover:bg-white/5 cursor-pointer text-white"
        //       >
        //         <img
        //           src={coin.gecko.image}
        //           alt={coin.gecko.name}
        //           className="w-8 h-8 inline-block mr-2"
        //         />
        //         {coin.gecko.name}
        //       </li>
        //     </Link>
        //   ))}
        // </ul>
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">
            No coins in your watchlist yet
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Add coins from the home page to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
