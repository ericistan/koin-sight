const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const API_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchWatchlist = async () => {
  const response = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE_NAME}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch watchlist: ${response.statusText}`);
  }

  const data = await response.json();

  return data.records.map((record) => ({
    id: record.id, // Airtable record ID (used for updates/deletes)
    gecko: {
      id: record.fields.coinId, // CoinGecko coin ID
      name: record.fields.coinName,
      image: record.fields.coinImage,
    },
  }));
};

export const addToWatchlist = async (coinId, coinName, coinImage) => {
  const response = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE_NAME}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      fields: {
        coinId,
        coinName,
        coinImage,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add to watchlist: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    gecko: {
      id: data.fields.coinId,
      name: data.fields.coinName,
      image: data.fields.coinImage,
    },
  };
};

export const deleteFromWatchlist = async (recordId) => {
  const response = await fetch(
    `${BASE_URL}/${BASE_ID}/${TABLE_NAME}/${recordId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete from watchlist: ${response.statusText}`);
  }
};
