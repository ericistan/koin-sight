import Airtable from "airtable";

// Initialize Airtable connection with API key and base ID from environment variables
const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_TOKEN }).base(
  import.meta.env.VITE_AIRTABLE_BASE_ID,
);

const table = base(import.meta.env.VITE_AIRTABLE_TABLE_NAME);

/**
 * Fetch all coins from user's watchlist
 * Maps Airtable records to normalized format with CoinGecko ID
 * Returns: array of { id: string, gecko: { id, name, image } } objects
 */
export const fetchWatchlist = async () => {
  const records = await table.select().all();
  return records.map((record) => ({
    id: record.id, // Airtable record ID (used for updates/deletes)
    gecko: {
      id: record.fields.coinId, // CoinGecko coin ID
      name: record.fields.coinName,
      image: record.fields.coinImage,
    },
  }));
};

/**
 * Add a coin to the user's watchlist in Airtable
 * Returns: the newly created record with ID and coin info
 */
export const addToWatchlist = async (coinId, coinName, coinImage) => {
  const createdRecord = await table.create({
    coinId: coinId,
    coinName: coinName,
    coinImage: coinImage,
  });
  return {
    id: createdRecord.id,
    gecko: {
      id: createdRecord.fields.coinId,
      name: createdRecord.fields.coinName,
      image: createdRecord.fields.coinImage,
    },
  };
};

/**
 * Remove a coin from the user's watchlist
 * Uses Airtable record ID to identify which record to delete
 */
export const deleteFromWatchlist = async (recordId) => {
  await table.destroy(recordId);
};
