// src/services/greedFearIndex.js

const API_KEY = import.meta.env.VITE_COINMARKETCAP_API_KEY;
const BASE_URL =
  "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical";

export const fetchFearGreedIndex = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=30`, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Fear & Greed Index");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Fear & Greed Index:", error);
    throw error;
  }
};
