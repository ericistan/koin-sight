const BASE_URL = "https://api.coingecko.com/api/v3";

// Fetches top 20 coins by market cap
export const fetchTopCoins = async () => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }

  return response.json();
};

// Fetches a single coin by its id e.g. 'bitcoin'
export const fetchCoinById = async (id) => {
  const response = await fetch(`${BASE_URL}/coins/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch coin: ${id}`);
  }

  return response.json();
};

//Fetch historical chart
export const fetchCoinMarketChart = async (id, days = 7) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch market chart for coin: ${id}`);
  }
  const data = await response.json();
  return data.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString(),
    price: Math.round(price * 100) / 100, // Round to 2 decimal places
  }));
};
