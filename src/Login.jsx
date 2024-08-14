import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./api"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${api.API_BASE_URL}/api/login`, {
        email,
        password,
      });
      setError(response.data.message);
      navigate("/home");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <p className="mt-3">
        <Link to="/forgot-password" className="link">
          Forgot Password?
        </Link>
      </p>
      <p className="mt-3">
        Don't have an account?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
