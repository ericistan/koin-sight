import Airtable from "airtable";

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_TOKEN }).base(
  import.meta.env.VITE_AIRTABLE_BASE_ID,
);

const table = base(import.meta.env.VITE_AIRTABLE_TABLE_NAME);

export const fetchWatchlist = async () => {
  const records = await table.select().all();
  return records.map((record) => ({
    id: record.id,
    gecko: {
      id: record.fields.coinId,
      name: record.fields.coinName,
      image: record.fields.coinImage,
    },
  }));
};

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

export const deleteFromWatchlist = async (recordId) => {
  await table.destroy(recordId);
};
