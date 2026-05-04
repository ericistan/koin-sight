import Airtable from "airtable";

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_TOKEN }).base(
  import.meta.env.VITE_AIRTABLE_BASE_ID,
);

const table = base(import.meta.env.VITE_AIRTABLE_TABLE_NAME);

export const fetchWatchlist = async () => {
  const records = await table.select().all();
  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};

export const addToWatchlist = async (coinId, coinName) => {
  const createdRecord = await table.create({
    coinId: coinId,
    coinName: coinName,
  });
  return {
    id: createdRecord.id, // This is Airtable's auto-generated ID
    ...createdRecord.fields,
  };
};

export const deleteFromWatchlist = async (recordId) => {
  await table.destroy(recordId);
};
