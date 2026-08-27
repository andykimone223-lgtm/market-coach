import React from "react";

export default function Analytics() {
  return (
    <div className="page">
      <h1>Analytics</h1>

      <p className="page-subtitle">
        Review the performance and consistency of the market analysis engine.
      </p>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Signals</h3>
          <strong>0</strong>
        </div>

        <div className="card">
          <h3>BUY Signals</h3>
          <strong>0</strong>
        </div>

        <div className="card">
          <h3>SELL Signals</h3>
          <strong>0</strong>
        </div>

        <div className="card">
          <h3>WAIT Signals</h3>
          <strong>0</strong>
        </div>
      </div>

      <div className="card">
        <h2>Signal Performance</h2>

        <p>
          Performance statistics will appear after the analysis engine has
          generated and recorded enough signals.
        </p>
      </div>

      <div className="card">
        <h2>Confidence Distribution</h2>

        <div className="indicator-grid">
          <span>Weak: 0</span>
          <span>Moderate: 0</span>
          <span>Strong: 0</span>
          <span>Very Strong: 0</span>
        </div>
      </div>

      <div className="card">
        <h2>Multi-Timeframe Agreement</h2>

        <p>
          This section will show how often M5, M15, H1, H4 and D1 agree with
          the final signal.
        </p>
      </div>
    </div>
  );
        }
