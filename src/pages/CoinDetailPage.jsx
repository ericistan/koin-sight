import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CoinDetail from "../components/CoinDetail";
import { useParams } from "react-router-dom";
import { fetchCoinById } from "../services/coingecko";
import DecryptedText from "../components/reactBits/DecryptedText";
import { addToWatchlist, deleteFromWatchlist } from "../services/airtable";
import { motion } from "motion/react";

const CoinDetailPage = ({ airTableWatchlist }) => {
  // Get coin ID from URL params (e.g., /coins/bitcoin)
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Track local watchlist state for immediate UI feedback
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [airTableRecordID, setAirTableRecordID] = useState(null);

  // Scroll to top when coin ID changes
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, [id]);

  // Fetch detailed coin data from CoinGecko - refetch every 30 seconds for live updates
  const { data: coin, isLoading } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Sync local watchlist state with Airtable data whenever it updates
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

  // Mutation for adding coin to watchlist
  const addMutation = useMutation({
    mutationFn: (data) =>
      addToWatchlist(data.coinId, data.coinName, data.coinImage),
    onSuccess: (response) => {
      setIsInWatchlist(true);
      setAirTableRecordID(response.id);
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  // Mutation for removing coin from watchlist
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
        {/* Coin image with 3D rotation animation */}
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

        {/* Coin name with animated decryption effect */}
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

        {/* Detailed coin information component with market data, chart, and watchlist controls */}
        <CoinDetail coin={coin} airTableWatchlist={airTableWatchlist} />
      </div>
    </>
  );
};

export default CoinDetailPage;
