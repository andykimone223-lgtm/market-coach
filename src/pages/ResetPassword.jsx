import React, { useState } from "react";

export default function ResetPassword({ onReset, onBackToLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    onReset();
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">MA</div>

        <h1>Reset Password</h1>

        <p className="auth-subtitle">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <label>New password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm new password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button type="submit" className="auth-button">
            Reset Password
          </button>
        </form>

        <button
          className="text-button"
          onClick={onBackToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
        }
