import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "../Styles/Forgotpass.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email");
      return;
    }

    const loadingToast = toast.loading("Sending reset link...");

    try {
      setLoading(true);

      const res = await axiosInstance.post("/api/password/forgot", {
        email: email,
      });

      toast.update(loadingToast, {
        render: res.data.message || "Reset link sent successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLink(res.data.resetLink || "");
      setEmail("");
    } catch (error) {
      console.log("Forgot password error:", error);

      toast.update(loadingToast, {
        render:
          error.response?.data?.message || "Something went wrong ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      setLink("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-card">
        <h2>Forgot Password</h2>
        <p>Enter your registered email</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {link && (
          <div className="fp-link-box">
            <p>Reset Link:</p>
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;