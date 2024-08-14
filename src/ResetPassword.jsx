import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "./api"; 

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${api.API_BASE_URL}/api/reset-password/${token}`,
        {
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="card p-4">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Reset Password
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default ResetPassword;
