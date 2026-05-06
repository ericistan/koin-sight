import { React, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import CoinDetail from "../components/CoinDetail";
import { useParams } from "react-router-dom";
import { fetchCoinById } from "../services/coingecko";
import { useNavigate } from "react-router-dom";
import DecryptedText from "../components/reactBits/DecryptedText";

const CoinDetailPage = ({ airTableWatchlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  //this extracts the ID form URL and give name to the variable "id" that we can use in this component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: coin, isLoading } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
    staleTime: 30 * 1000, // Refresh every 30 seconds
    refetchInterval: 30 * 1000, // Active refresh every 30 seconds
    gcTime: 10 * 60 * 1000,
  });

  return (
    <>
      <div className="max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8 pt-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-lg transition-all duration-200"
        >
          ← Back
        </button>
        <div>
          {coin?.image && (
            <img
              src={coin.image.large}
              className="w-24 h-24 mx-auto rounded-full shadow-lg"
            />
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
          <div style={{ marginTop: "1rem" }}>
            <DecryptedText
              text={coin?.name || "Loading..."}
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              animateOn="view" // ← Auto-animate when visible
              speed={80}
            />
          </div>
        </h1>
        <CoinDetail coin={coin} airTableWatchlist={airTableWatchlist} />
      </div>
    </>
  );
};

export default CoinDetailPage;
