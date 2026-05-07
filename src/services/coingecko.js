const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Retry mechanism with exponential backoff for handling rate limiting
 * Handles 429 (Too Many Requests) errors and other network failures
 * Max retries: 3, with exponential backoff (1s, 2s, 4s)
 */
const fetchWithRetry = async (url, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      // Handle rate limiting - wait and retry instead of failing immediately
      if (response.status === 429) {
        const delay = Math.min(
          1000 * Math.pow(2, i) + Math.random() * 1000,
          10000,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.min(
        1000 * Math.pow(2, i) + Math.random() * 1000,
        10000,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

/**
 * Fetch top 20 cryptocurrencies
 * Returns: array of coins with price, market cap, and market data
 */
export const fetchTopCoins = async () => {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`;
  return fetchWithRetry(url);
};

/**
 * Fetch detailed information for a single cryptocurrency by ID
 * Returns: full coin data including description, links, and market data
 */
export const fetchCoinById = async (id) => {
  const url = `${BASE_URL}/coins/${id}`;
  return fetchWithRetry(url);
};

/*
 * Fetch historical price data for a coin
 */
export const fetchCoinMarketChart = async (id, days = 7) => {
  const url = `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  const data = await fetchWithRetry(url);
  return data.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString(),
    price: Math.round(price * 100) / 100,
  }));
};
