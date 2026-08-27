import React, { useMemo, useState } from "react";

export default function Risk() {
  const [accountBalance, setAccountBalance] = useState(1000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLossPips, setStopLossPips] = useState(20);

  const riskAmount = useMemo(() => {
    return (Number(accountBalance) * Number(riskPercent)) / 100;
  }, [accountBalance, riskPercent]);

  const estimatedPipValue = useMemo(() => {
    if (!stopLossPips || stopLossPips <= 0) return 0;
    return riskAmount / Number(stopLossPips);
  }, [riskAmount, stopLossPips]);

  return (
    <div className="page">
      <h1>Risk Management</h1>

      <p className="page-subtitle">
        Calculate a risk amount before entering a practice or trading setup.
      </p>

      <div className="card">
        <h2>Risk Calculator</h2>

        <label>Account balance</label>
        <input
          type="number"
          min="0"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
        />

        <label>Risk percentage</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={riskPercent}
          onChange={(e) => setRiskPercent(e.target.value)}
        />

        <label>Stop-loss distance (pips)</label>
        <input
          type="number"
          min="1"
          value={stopLossPips}
          onChange={(e) => setStopLossPips(e.target.value)}
        />
      </div>

      <div className="stats-grid">
        <div className="card">
          <h3>Maximum Risk</h3>
          <strong>{Number(riskAmount).toFixed(2)}</strong>
        </div>

        <div className="card">
          <h3>Estimated Pip Value</h3>
          <strong>{Number(estimatedPipValue).toFixed(2)}</strong>
        </div>
      </div>

      <div className="card">
        <h2>Risk Reminder</h2>
        <p>
          This calculator is an estimate. Actual position sizing depends on
          the currency pair, account currency, entry price, stop-loss,
          contract size, and broker specifications.
        </p>
      </div>
    </div>
  );
        }
