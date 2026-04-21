import React, { useState } from "react";
import axios from "axios";
import "../Styles/Forgotpass.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/password/forgot", {
        email: email,
      });

      setMessage(res.data.message);
      setLink(res.data.resetLink);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setLink("");
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
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>

        {message && <p className="fp-message">{message}</p>}
        {link && <p className="fp-link">{link}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;