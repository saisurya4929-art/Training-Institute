import React, { useState } from "react";
import "../Styles/Login.css";
import girl from "../assets/bgimg.jpeg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    const toastId = toast.loading("Logging in...");

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        })
      );

      toast.update(toastId, {
        render: "Login successful ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      if (res.data.role?.toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/studentdashboard");
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: error.response?.data || "Login failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-wrapper">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="login-image-section"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={girl} alt="login visual" className="login-side-image" />
          <div className="login-overlay"></div>

          <div className="login-image-content">
            <h2>Welcome Back</h2>
            <p>
              Continue your journey, access your courses, and build your future
              with confidence.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="login1-form-section"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="login1-form-box">
            <h1>Sign In</h1>
            <p className="login-subtitle">Please login to your account</p>

            <form onSubmit={handleLogin} className="login1-form">
              <div className="input-group1">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group1">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-extra">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <motion.button
                type="submit"
                className="login-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Login
              </motion.button>

              <p className="signup-text">
                Don’t have an account? <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;