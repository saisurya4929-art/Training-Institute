
import React, { useState } from "react";
import "../Styles/Login.css";
import girl from "../assets/girl.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/Studentdashboard");
      }

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >

      {/* LEFT */}
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
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
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
          </form>
        </div>
      </motion.div>

      {/* RIGHT */}
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