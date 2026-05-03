// src/services/greedFearIndex.js

const BASE_URL = "https://api.alternative.me/fng/";

export const fetchFearGreedIndex = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch Fear & Greed Index");
  }

  const json = await response.json();

  // We only need the first item in the data array
  // and we convert value from string to number here
  // so components never have to worry about it
  return {
    score: Number(json.data[0].value),
    classification: json.data[0].value_classification,
    timestamp: json.data[0].timestamp,
  };
};
