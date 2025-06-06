// src/pages/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ResetPassword.css'

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading ]= useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true)
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsUploading(false)
      return;
    }

    try {
      const res = await axios.post("https://abhyeti-constructions-backend.onrender.com/api/admin/reset-password", {
        token,
        newPassword: password,
      });

      if (res.status === 200) {
        alert("Password reset successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Reset failed. Invalid or expired token.");
    } finally{
      setIsUploading(false)
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isUploading}>{isUploading ? <span className='spinner'></span> : "Reset Password"}</button>
      </form>
    </div>
  );
};

export default ResetPassword;
