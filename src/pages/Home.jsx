import React from "react";

export default function Home() {
  return (
    <div className="page">
      <h1>Home</h1>

      <p className="page-subtitle">
        Welcome to Market Analysis.
      </p>

      <div className="stats-grid">
        <div className="card">
          <h3>Market Signal</h3>
          <div className="signal">WAIT</div>
          <p>Waiting for live market analysis.</p>
        </div>

        <div className="card">
          <h3>BUY Probability</h3>
          <strong>33%</strong>
        </div>

        <div className="card">
          <h3>SELL Probability</h3>
          <strong>33%</strong>
        </div>

        <div className="card">
          <h3>WAIT Probability</h3>
          <strong>34%</strong>
        </div>
      </div>

      <div className="card">
        <h2>Market Status</h2>
        <p>
          Live market data will appear here once the backend is connected.
        </p>
      </div>
    </div>
  );
}
