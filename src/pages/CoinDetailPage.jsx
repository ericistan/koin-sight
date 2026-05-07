import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../services/greedFearIndex";
import { fetchTopCoins } from "../services/coingecko";
import CoinDetail from "../components/CoinDetail";
import { useParams } from "react-router-dom";
import { fetchCoinById } from "../services/coingecko";
import DecryptedText from "../components/reactBits/DecryptedText";
import { Star } from "lucide-react";
import { addToWatchlist, deleteFromWatchlist } from "../services/airtable";
import { motion } from "framer-motion";

const CoinDetailPage = ({ airTableWatchlist }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [airTableRecordID, setAirTableRecordID] = useState(null);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, [id]);

  const { data: coin, isLoading } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
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
    <>
      <div className="md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:p-6 lg:p-8 pt-20 mt-32">
        <div>
          {coin?.image && (
            <motion.img
              src={coin.image.large}
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold text-white mb-8 text-center">
          <div style={{ marginTop: "1rem" }}>
            <DecryptedText
              text={coin?.name || "Loading..."}
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              animateOn="view"
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
