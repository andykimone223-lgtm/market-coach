import React from "react";

export default function Charts() {
  return (
    <div className="page">
      <h1>Charts</h1>

      <p className="page-subtitle">
        Analyze price action across multiple timeframes.
      </p>

      <div className="card">
        <div className="controls">
          <select defaultValue="EUR/USD">
            <option>EUR/USD</option>
            <option>GBP/USD</option>
            <option>USD/JPY</option>
            <option>USD/CHF</option>
            <option>AUD/USD</option>
            <option>USD/CAD</option>
            <option>NZD/USD</option>
          </select>

          <select defaultValue="H1">
            <option>M1</option>
            <option>M5</option>
            <option>M15</option>
            <option>M30</option>
            <option>H1</option>
            <option>H4</option>
            <option>D1</option>
            <option>W1</option>
          </select>
        </div>
      </div>

      <div className="card chart-placeholder">
        <h2>Price Chart</h2>

        <div className="chart-area">
          <p>
            Live candlestick chart will appear here when market data is
            connected.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Indicators</h2>

        <div className="indicator-grid">
          <span>EMA 9</span>
          <span>EMA 20</span>
          <span>EMA 50</span>
          <span>EMA 100</span>
          <span>EMA 200</span>
          <span>RSI</span>
          <span>MACD</span>
          <span>ADX</span>
          <span>ATR</span>
          <span>Bollinger Bands</span>
        </div>
      </div>
    </div>
  );
}
