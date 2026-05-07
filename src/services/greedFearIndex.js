const BASE_URL = "https://api.alternative.me/fng/";

export const fetchFearGreedIndex = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch Fear & Greed Index");
    }

    const data = await response.json();
    return {
      value: data.data[0].value,
      classification: data.data[0].value_classification,
      timestamp: data.data[0].timestamp,
    };
  } catch (error) {
    console.error("Error fetching Fear & Greed Index:", error);
    throw error;
  }
};
