const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function getMarketData(symbol, interval) {
  if (!API_BASE_URL) {
    throw new Error("Market data backend is not configured.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/market-data?symbol=${encodeURIComponent(symbol)}&interval=${encodeURIComponent(interval)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch market data.");
  }

  return response.json();
}
