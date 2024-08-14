import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./api"; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${api.API_BASE_URL}/api/register`, {
        email,
        password,
      });
      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div className="form-group">
          Password
          <input
            type="password"
            className="form-control mt-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          Confirm Password
          <input
            type="password"
            className="form-control mt-2"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        {message && <p className="text-success">{message}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/" className="link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
