import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Resetpass.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      toast.warning("Please enter new password");
      return;
    }

    const loadingToast = toast.loading("Resetting password...");

    try {
      setLoading(true);

      const res = await axiosInstance.post("/api/password/reset", {
        token: token,
        newPassword: newPassword,
      });

      toast.update(loadingToast, {
        render: res.data.message || "Password reset successful ✅",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      setNewPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("Reset password error:", error);

      toast.update(loadingToast, {
        render: error.response?.data?.message || "Something went wrong ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-wrapper">
      <div className="rp-card">
        <h2>Reset Password</h2>
        <p>Enter your new password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;