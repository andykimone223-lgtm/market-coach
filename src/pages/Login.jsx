import React, { useState } from "react";

export default function Login({ onLogin, onRegister, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin();
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          MA
        </div>

        <h1>Market Analysis</h1>
        <p className="auth-subtitle">
          Sign in to your account
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

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <button
          className="text-button"
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>

        <div className="auth-divider">
          <span>Don't have an account?</span>
        </div>

        <button
          className="secondary-button"
          onClick={onRegister}
        >
          Create account
        </button>
      </div>
    </div>
  );
}
