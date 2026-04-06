import React from "react";
import '../Styles/Hero-banner.css';
import { motion } from "framer-motion";


const HeroBanner = () => {
  return (
    <div className="hero">

      <div className="hero-overlay">
        <motion.div 
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="hero-tag">Best Training Institute</span>
          <h1>
            Learn Skills <br /> Build Your Career
          </h1>
          <p>
            Join our professional courses in Java, React, Full Stack and
            get real-time projects with placement support.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn">Join For Free</button>
            <button className="hero-outline">View Courses</button>
          </div>
        </motion.div>
      </div>``
    </div>
  );
};

export default HeroBanner;