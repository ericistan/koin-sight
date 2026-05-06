import React from "react";
import CoinTable from "../components/CoinTable";
import FearGreedMeter from "../components/FearGreedMeter";
import ShinyText from "../components/reactBits/ShinyText";

const HomePage = ({ coins, isLoading }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8">
      <div className="mb-8 mt-20 text-5xl md:text-6xl font-bold text-center">
        <ShinyText
          text="K⌾IN SIGHT"
          speed={2}
          delay={0}
          color="#3acb55"
          shineColor="rgb(126, 230, 145)"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover
          disabled={false}
        />
      </div>

      {/* <FearGreedMeter /> */}
      <h2 className="text-lg font-medium text-gray-400 mb-6 text-center">
        Top 20 Cryptocurrencies
      </h2>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full mb-6 px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-gray-500 rounded-2xl text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
      />
      <CoinTable coins={filteredCoins} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
