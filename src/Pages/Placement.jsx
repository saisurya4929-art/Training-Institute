import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Styles/Placement.css";
import PlacementSkeleton from "../components/PlacementSkeleton";
import ErrorBoundary from "../components/ErrorBoundary";

import Zoho from "../assets/Zoho_Corporation-Logo.wine.svg";
import Cognizant from "../assets/Cognizant-logo.wine.svg";
import Ford from "../assets/FordLogo.wine.svg";
import Accenture from "../assets/Accenture-Logo.wine.svg";
import Oracle from "../assets/Oracle.wine.svg";
import Cap from "../assets/cap.wine.svg";
import Amazon from "../assets/Amazon.svg";
import Google from "../assets/Google.svg";
import Info from "../assets/Info.svg";
import Tcs from "../assets/img6.jpg";

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:8080/api/placements");
      console.log("placements:", res.data);
      setPlacements(res.data);
    } catch (error) {
      console.log("Error fetching placements:", error);
      setError("Failed to load placement data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="placements">
        <motion.div
          className="placement-header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Our Placement Achievements</h1>
          <p>
            We provide 100% placement assistance with strong industry
            connections. Our students work in top IT companies across India.
          </p>
        </motion.div>

        <div className="placement-stats">
          <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
            <h2>1200</h2>
            <p>Students Placed</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
            <h2>150+</h2>
            <p>Hiring Companies</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
            <h2>12 LPA</h2>
            <p>Highest Package</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
            <h2>3 LPA</h2>
            <p>Average Package</p>
          </motion.div>
        </div>

        <h2 className="section-title">Recently Placed Students</h2>
        <PlacementSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="placements">
        <p className="no-data">{error}</p>
      </div>
    );
  }

  return (
    <div className="placements">
      <motion.div
        className="placement-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Our Placement Achievements</h1>
        <p>
          We provide 100% placement assistance with strong industry
          connections. Our students work in top IT companies across India.
        </p>
      </motion.div>

      <div className="placement-stats">
        <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
          <h2>1200</h2>
          <p>Students Placed</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
          <h2>150+</h2>
          <p>Hiring Companies</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
          <h2>12 LPA</h2>
          <p>Highest Package</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
          <h2>3 LPA</h2>
          <p>Average Package</p>
        </motion.div>
      </div>

      <h2 className="section-title">Recently Placed Students</h2>

      <ErrorBoundary>
        <div className="students-grid">
          {placements.length > 0 ? (
            placements.map((student, index) => (
              <motion.div
                key={student.id || index}
                className="student-card"
                whileHover={{ scale: 1.07 }}
              >
                <img
                  src={student.imageUrl}
                  alt={student.studentName}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <h3>{student.studentName}</h3>
                <p>{student.company}</p>
                <span>{student.packageAmount}</span>
              </motion.div>
            ))
          ) : (
            <p className="no-data">No placement data found</p>
          )}
        </div>
      </ErrorBoundary>

      <h2 className="section-title">Our Hiring Partners</h2>

      <div className="logo-slider">
        <div className="logo-track">
          <img src={Zoho} alt="Zoho" />
          <img src={Cognizant} alt="Cognizant" />
          <img src={Ford} alt="Ford" />
          <img src={Tcs} alt="TCS" />
          <img src={Accenture} alt="Accenture" />
          <img src={Oracle} alt="Oracle" />
          <img src={Cap} alt="Capgemini" />
          <img src={Info} alt="Infosys" />
          <img src={Google} alt="Google" />
          <img src={Amazon} alt="Amazon" />
        </div>
      </div>

      <h2 className="section-title">Placement Records</h2>

      <ErrorBoundary>
        <table className="placement-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Company</th>
              <th>Role</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            {placements.length > 0 ? (
              placements.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.studentName}</td>
                  <td>{item.company}</td>
                  <td>{item.role}</td>
                  <td>{item.packageAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No placement records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </ErrorBoundary>
    </div>
  );
};

export default Placements;