import React from "react";
import { motion } from "framer-motion";
import "../Styles/Placement.css";
import Zoho from  "../assets/Zoho_Corporation-Logo.wine.svg";
import Cognizant from"../assets/Cognizant-logo.wine.svg";
import Ford from"../assets/FordLogo.wine.svg";
import Accenture from "../assets/Accenture-Logo.wine.svg";
import Oracle from "../assets/Oracle.wine.svg";
import Cap from "../assets/cap.wine.svg";
import Amazon from "../assets/Amazon.svg";
import Google from "../assets/Google.svg";
import Info from "../assets/Info.svg";
import Tcs from "../assets/img6.jpg";

const students = [
  {
    name: "Markram",
    company: "ZOHO",
    package: "6 LPA",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Liya",
    company: "Infosys",
    package: "5 LPA",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael ",
    company: "TCS",
    package: "4.5 LPA",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const Placements = () => {
  return (
    <div className="placements">

      {/* HEADER */}
      <motion.div
        className="placement-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Our Placement Achievements</h1>
        <p>
          We provide 100% placement assistance with strong industry
          connections. Our students work in top IT companies across India
          thanks to our real-time training and interview preparation programs.
        </p>
      </motion.div>

      {/* COUNTERS */}
      <div className="placement-stats">

        <motion.div whileHover={{ scale: 1.05 }} className="stat-box">
          <h2>1200+</h2>
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

      {/* PLACED STUDENTS */}
      <h2 className="section-title">Recently Placed Students</h2>

      <div className="students-grid">
        {students.map((student, index) => (
          <motion.div
            key={index}
            className="student-card"
            whileHover={{ scale: 1.07 }}
          >
            <img src={student.img} alt={student.name} />
            <h3>{student.name}</h3>
            <p>{student.company}</p>
            <span>{student.package}</span>
          </motion.div>
        ))}
      </div>

      {/* COMPANY LOGOS */}
      <h2 className="section-title">Our Hiring Partners</h2>

      <div className="logo-slider">
        <div className="logo-track">
          <img src={Zoho} alt="Zoho" />
          <img src={Cognizant} alt="Cognizant" />
          <img src={Ford} alt="Ford" />
          <img src={Tcs} alt="Tcs" />
          <img src={Accenture} alt="Accenture" />
          <img src={Oracle} alt="Oracle" />
          <img src={Cap} alt="Cap" />
          <img src={Info} alt="Info"/>
          <img src={Google} alt="Google" />
          <img src={Amazon} alt="Amazon.svg"/>
          
        </div>
      </div>

      {/* PLACEMENT TABLE */}
      <h2 className="section-title">Placement Records</h2>

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
          <tr>
            <td>Markram</td>
            <td>Zoho</td>
            <td>Software Engineer</td>
            <td>6 LPA</td>
          </tr>
          <tr>
            <td>Liya</td>
            <td>Infosys</td>
            <td>Java full stackDeveloper</td>
            <td>5 LPA</td>
          </tr>
          <tr>
            <td>Michael</td>
            <td>TCS</td>
            <td>Frontend Developer</td>
            <td>4.5 LPA</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default Placements




