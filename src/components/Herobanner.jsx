import React from "react";
import '../Styles/Hero-banner.css';


// import heroImg from "../assets/training.jpeg";
import { motion } from "framer-motion";

// const HeroBanner = () => {
//   return (
//     <div className="hero">

//       <div className="hero-left">

//         <span className="hero-tag">Best Training Institute</span>

//         <motion.h1
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//         >
//           Learn New Skills <br /> Grow Your Career
//         </motion.h1>

//         <p>
//           Join our professional training programs in Web Development,
//           Java, React, and Full Stack Development. Get real-time projects,
//           expert mentorship, and placement support.
//         </p>

//         {/* Feature Points */}
//         <div className="hero-features">
//           <div>✔ Live Projects</div>
//           <div>✔ Placement Support</div>
//           <div>✔ Expert Trainers</div>
//           <div>✔ Certification</div>
//         </div>

//         {/* Buttons */}
//         <div className="hero-buttons">
//           <button className="hero-btn">Join For Free</button>
//           <button className="hero-outline">View Courses</button>
//         </div>

//       </div>

//       <motion.div
//         className="hero-right"
//         initial={{ x: 100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//       >
//         <img src={heroImg} alt="hero" />
//       </motion.div>

//     </div>
//   );
// };

// export default HeroBanner;
// import React from "react";
// import "./HeroBanner.css";
// import { motion } from "framer-motion";

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
      </div>

    </div>
  );
};

export default HeroBanner;