import React, { useState } from "react";

export default function ForgotPassword({ onBackToLogin, onContinue }) {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email) return;

    onContinue(email);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          MA
        </div>

        <h1>Forgot Password?</h1>

        <p className="auth-subtitle">
          Enter your email and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Continue
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
