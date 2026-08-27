import React, { useState } from "react";

export default function Practice() {
  const [balance, setBalance] = useState(10000);
  const [trades, setTrades] = useState([]);
  const [symbol, setSymbol] = useState("EUR/USD");
  const [direction, setDirection] = useState("BUY");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [units, setUnits] = useState(1000);

  function calculateResult() {
    const entryPrice = Number(entry);
    const exitPrice = Number(exit);
    const tradeUnits = Number(units);

    if (!entryPrice || !exitPrice || !tradeUnits) {
      return null;
    }

    const priceDifference =
      direction === "BUY"
        ? exitPrice - entryPrice
        : entryPrice - exitPrice;

    return priceDifference * tradeUnits;
  }

  function closePracticeTrade(event) {
    event.preventDefault();

    const result = calculateResult();

    if (result === null) {
      return;
    }

    const newTrade = {
      id: Date.now(),
      symbol,
      direction,
      entry: Number(entry),
      exit: Number(exit),
      units: Number(units),
      result,
    };

    setTrades((current) => [newTrade, ...current]);
    setBalance((current) => current + result);

    setEntry("");
    setExit("");
  }

  return (
    <div className="page">
      <h1>Practice Mode</h1>

      <p className="page-subtitle">
        Simulate trades without sending orders to a broker.
      </p>

      <div className="stats-grid">
        <div className="card">
          <h3>Practice Balance</h3>
          <strong>{balance.toFixed(2)}</strong>
        </div>

        <div className="card">
          <h3>Practice Trades</h3>
          <strong>{trades.length}</strong>
        </div>
      </div>

      <div className="card">
        <h2>Open Practice Trade</h2>

        <form onSubmit={closePracticeTrade}>
          <label>Currency pair</label>

          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          >
            <option>EUR/USD</option>
            <option>GBP/USD</option>
            <option>USD/JPY</option>
            <option>USD/CHF</option>
            <option>AUD/USD</option>
            <option>USD/CAD</option>
            <option>NZD/USD</option>
          </select>

          <label>Direction</label>

          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option>BUY</option>
            <option>SELL</option>
          </select>

          <label>Entry price</label>

          <input
            type="number"
            step="any"
            placeholder="Example: 1.10000"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            required
          />

          <label>Exit price</label>

          <input
            type="number"
            step="any"
            placeholder="Example: 1.10200"
            value={exit}
            onChange={(e) => setExit(e.target.value)}
            required
          />

          <label>Units</label>

          <input
            type="number"
            min="1"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            required
          />

          <button type="submit">
            Close Practice Trade
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Practice History</h2>

        {trades.length === 0 ? (
          <p>No practice trades yet.</p>
        ) : (
          trades.map((trade) => (
            <div key={trade.id} className="card">
              <strong>
                {trade.symbol} — {trade.direction}
              </strong>

              <p>
                Entry: {trade.entry} | Exit: {trade.exit}
              </p>

              <p>
                Result: {trade.result.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
