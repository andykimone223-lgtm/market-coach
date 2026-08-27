import React, { useState } from "react";

export default function Backtester() {
  const [symbol, setSymbol] = useState("EUR/USD");
  const [timeframe, setTimeframe] = useState("H1");
  const [status, setStatus] = useState("Ready");

  function startBacktest() {
    setStatus("Backtest engine ready for historical data.");
  }

  return (
    <div className="page">
      <h1>Backtester</h1>

      <p className="page-subtitle">
        Test the deterministic analysis strategy against historical market data.
      </p>

      <div className="card">
        <h2>Backtest Setup</h2>

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

        <label>Timeframe</label>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option>M5</option>
          <option>M15</option>
          <option>M30</option>
          <option>H1</option>
          <option>H4</option>
          <option>D1</option>
          <option>W1</option>
        </select>

        <button onClick={startBacktest}>
          Start Backtest
        </button>
      </div>

      <div className="stats-grid">
        <div className="card">
          <h3>Status</h3>
          <strong>{status}</strong>
        </div>

        <div className="card">
          <h3>Trades</h3>
          <strong>0</strong>
        </div>

        <div className="card">
          <h3>Win Rate</h3>
          <strong>—</strong>
        </div>

        <div className="card">
          <h3>Net Result</h3>
          <strong>—</strong>
        </div>
      </div>

      <div className="card">
        <h2>Backtest Results</h2>

        <p>
          Historical candles and the deterministic signal engine will be
          connected here.
        </p>
      </div>
    </div>
  );
}
