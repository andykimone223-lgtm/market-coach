export default async function handler(req, res) {
  try {
    const { symbol, interval } = req.query;

    if (!symbol || !interval) {
      return res.status(400).json({
        error: "symbol and interval are required"
      });
    }

    if (!process.env.TWELVEDATA_API_KEY) {
      return res.status(500).json({
        error: "TwelveData API key is not configured"
      });
    }

    const url = new URL("https://api.twelvedata.com/time_series");

    url.searchParams.set("symbol", symbol);
    url.searchParams.set("interval", interval);
    url.searchParams.set("outputsize", "100");
    url.searchParams.set("apikey", process.env.TWELVEDATA_API_KEY);

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return res.status(502).json({
        error: data.message || "Market data provider error"
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
