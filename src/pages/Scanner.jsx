import React from "react";

export default function Scanner() {
  return (
    <div className="page">
      <h1>Market Scanner</h1>

      <p className="page-subtitle">
        Scan supported forex pairs for potential market setups.
      </p>

      <div className="card">
        <div className="controls">
          <select defaultValue="all">
            <option value="all">All Currency Pairs</option>
            <option value="EUR/USD">EUR/USD</option>
            <option value="GBP/USD">GBP/USD</option>
            <option value="USD/JPY">USD/JPY</option>
            <option value="USD/CHF">USD/CHF</option>
            <option value="AUD/USD">AUD/USD</option>
            <option value="USD/CAD">USD/CAD</option>
            <option value="NZD/USD">NZD/USD</option>
          </select>

          <select defaultValue="M15">
            <option>M5</option>
            <option>M15</option>
            <option>M30</option>
            <option>H1</option>
            <option>H4</option>
            <option>D1</option>
            <option>W1</option>
          </select>

          <button>
            Scan Market
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Scan Results</h2>

        <p>
          No live scan results yet. Connect the market-data backend to begin
          scanning.
        </p>
      </div>
    </div>
  );
}
