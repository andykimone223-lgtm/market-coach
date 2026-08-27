import React, { useState } from "react";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [symbol, setSymbol] = useState("EUR/USD");
  const [signal, setSignal] = useState("BUY");
  const [timeframe, setTimeframe] = useState("H1");
  const [notes, setNotes] = useState("");

  function addEntry(event) {
    event.preventDefault();

    if (!notes.trim()) return;

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      symbol,
      signal,
      timeframe,
      notes: notes.trim(),
    };

    setEntries((current) => [entry, ...current]);
    setNotes("");
  }

  return (
    <div className="page">
      <h1>Journal</h1>

      <p className="page-subtitle">
        Record your market analysis and review your decisions over time.
      </p>

      <div className="card">
        <h2>New Journal Entry</h2>

        <form onSubmit={addEntry}>
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

          <label>Signal</label>

          <select
            value={signal}
            onChange={(e) => setSignal(e.target.value)}
          >
            <option>BUY</option>
            <option>SELL</option>
            <option>WAIT</option>
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

          <label>Notes</label>

          <textarea
            rows="5"
            placeholder="Record what the analysis showed..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />

          <button type="submit">
            Save Entry
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Journal History</h2>

        {entries.length === 0 ? (
          <p>No journal entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="card">
              <strong>
                {entry.symbol} — {entry.signal}
              </strong>

              <p>
                {entry.timeframe} · {entry.date}
              </p>

              <p>{entry.notes}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
      }
