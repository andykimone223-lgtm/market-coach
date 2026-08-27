import React from "react";

export default function Admin() {
  const services = [
    {
      name: "Market Data",
      status: "Waiting",
      description: "TwelveData market-data connection",
    },
    {
      name: "Analysis Engine",
      status: "Ready",
      description: "Deterministic technical-analysis engine",
    },
    {
      name: "Backend API",
      status: "Ready",
      description: "Application backend endpoints",
    },
    {
      name: "AI",
      status: "Disabled",
      description: "AI is intentionally not used",
    },
    {
      name: "Broker Connection",
      status: "Disabled",
      description: "No Exness, FBS, MT5, or broker trading connection",
    },
  ];

  return (
    <div className="page">
      <h1>Admin</h1>

      <p className="page-subtitle">
        Monitor the Market Analysis system.
      </p>

      <div className="card">
        <h2>System Overview</h2>

        <p>
          This dashboard is for authorized administrators only.
        </p>
      </div>

      <div className="stats-grid">
        {services.map((service) => (
          <div className="card" key={service.name}>
            <h3>{service.name}</h3>

            <strong>{service.status}</strong>

            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Analysis Configuration</h2>

        <div className="indicator-grid">
          <span>EMA 9 / 20 / 50 / 100 / 200</span>
          <span>RSI 14</span>
          <span>MACD</span>
          <span>ADX 14</span>
          <span>ATR 14</span>
          <span>Bollinger Bands</span>
          <span>Support & Resistance</span>
          <span>Market Structure</span>
          <span>Multi-Timeframe Confirmation</span>
        </div>
      </div>

      <div className="card">
        <h2>Security</h2>

        <p>
          API credentials must remain on the backend and must never be
          exposed in the frontend.
        </p>

        <p>
          Admin access will be restricted to authorized accounts when
          authentication is connected.
        </p>
      </div>

      <div className="card">
        <h2>System Events</h2>

        <p>
          No system events recorded yet.
        </p>
      </div>
    </div>
  );
}
