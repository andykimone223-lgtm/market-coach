import React from "react";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Market Analysis</h1>
        <p>Forex market probability analyzer</p>
      </header>

      <main className="dashboard">
        <section className="card">
          <h2>Market Analysis</h2>
          <p>Select a currency pair and timeframe to analyze the market.</p>

          <div className="controls">
            <select>
              <option>EUR/USD</option>
              <option>GBP/USD</option>
              <option>USD/JPY</option>
              <option>USD/CHF</option>
              <option>AUD/USD</option>
              <option>USD/CAD</option>
              <option>NZD/USD</option>
            </select>

            <select>
              <option>M5</option>
              <option>M15</option>
              <option>M30</option>
              <option>H1</option>
              <option>H4</option>
              <option>D1</option>
              <option>W1</option>
            </select>

            <button>Analyze Market</button>
          </div>
        </section>

        <section className="card">
          <h2>Signal</h2>
          <div className="signal">WAIT</div>

          <div className="probabilities">
            <div>BUY <strong>33%</strong></div>
            <div>SELL <strong>33%</strong></div>
            <div>WAIT <strong>34%</strong></div>
          </div>
        </section>

        <section className="card">
          <h2>System Status</h2>
          <p>Market Data: <strong>Connecting...</strong></p>
          <p>Analysis Engine: <strong>Ready</strong></p>
          <p>Backend: <strong>Connecting...</strong></p>
        </section>
      </main>
    </div>
  );
            }
