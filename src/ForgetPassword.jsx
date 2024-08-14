import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "./api"; 

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${api.API_BASE_URL}/api/forgot-password`,
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error sending reset link. Please try again."
      );
    }
  };

  return (
    <div className="card">
      <h2>Forgot Password?</h2>
      <p>
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form onSubmit={handleForgetPassword}>
        <div className="form-group">
          Email
          <input
            type="email"
            className="form-control mt-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Send Reset Link
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <p className="mt-3">
        <Link to="/" className="link">
          Back to Login
        </Link>
      </p>
    </div>
  );
}

export default ForgetPassword;
