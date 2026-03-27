import React, { useState } from "react";
import '../Styles/Login.css';
import girl from '../assets/girl.png';
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

      // role based redirect
      if (user.role === "ADMIN") {
        navigate("/"); // admin -> home
      } else {
        navigate("/student-dashboard"); // student -> dashboard
      }

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <motion.div 
        className="login-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Welcome Back</h2>

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

      </motion.div>

      {/* RIGHT IMAGE */}
      <div 
        className="login-right"
        style={{ backgroundImage: `url(${girl})` }}
      />

    </div>
  );
};

export default LoginPage;