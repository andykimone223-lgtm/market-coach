import React, { useState } from "react";

export default function Register({ onRegister, onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    onRegister();
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          MA
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Create your Market Analysis account
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm password</label>

          <input
            type="password"
            placeholder="Confirm your password"
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
            Create Account
          </button>
        </form>

        <button
          className="text-button"
          onClick={onBackToLogin}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
