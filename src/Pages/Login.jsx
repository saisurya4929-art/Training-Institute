import React, { useState } from "react";
import "../Styles/Login.css";
import girl from "../assets/girl.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        {
          email,
          password
        }
      );

      if (typeof res.data === "string") {
        alert(res.data);
        return;
      }

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          courses: res.data.courses
        })
      );

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/studentdashboard");
      }

    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="login-left"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue learning</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <motion.button
              type="submit"
              className="login-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            <p style={{ marginTop: "12px", textAlign: "center" }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </form>
        </div>
      </motion.div>

      <motion.div
        className="login-right"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img src={girl} alt="login" />
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;