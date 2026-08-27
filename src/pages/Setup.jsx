import React, { useState } from "react";

export default function Setup() {
  const [timeframes, setTimeframes] = useState({
    M5: true,
    M15: true,
    H1: true,
    H4: true,
    D1: true,
  });

  function toggleTimeframe(timeframe) {
    setTimeframes((current) => ({
      ...current,
      [timeframe]: !current[timeframe],
    }));
  }

  return (
    <div className="page">
      <h1>Analysis Setup</h1>

      <p className="page-subtitle">
        Configure how Market Analysis evaluates the market.
      </p>

      <div className="card">
        <h2>Primary Timeframes</h2>

        <p>
          Select the timeframes used for multi-timeframe confirmation.
        </p>

        <div className="indicator-grid">
          {Object.entries(timeframes).map(([timeframe, enabled]) => (
            <button
              key={timeframe}
              type="button"
              onClick={() => toggleTimeframe(timeframe)}
              className={enabled ? "selected-option" : ""}
            >
              {timeframe}: {enabled ? "ON" : "OFF"}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Technical Analysis</h2>

        <div className="indicator-grid">
          <span>EMA 9 / 20 / 50</span>
          <span>EMA 100 / 200</span>
          <span>RSI</span>
          <span>MACD</span>
          <span>ADX + DI</span>
          <span>ATR</span>
          <span>Bollinger Bands</span>
          <span>Support & Resistance</span>
          <span>Market Structure</span>
        </div>
      </div>

      <div className="card">
        <h2>Signal Decision</h2>

        <p>
          The final analysis will return only one primary state:
        </p>

        <div className="probabilities">
          <div>BUY</div>
          <div>SELL</div>
          <div>WAIT</div>
        </div>

        <p>
          BUY, SELL, and WAIT probabilities will always total 100%.
        </p>
      </div>
    </div>
  );
}
