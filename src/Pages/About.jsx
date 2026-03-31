
import React from "react";
import { motion } from "framer-motion";
import '../Styles/About.css';


const cardAnimation = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const AboutUs = () => {
  return (
    <div className="about-page">

      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>
      <div className="bg-shape shape3"></div>

      <header className="header">
        <h2 className="logo">Global Skills Acaedmy</h2>
      </header>

      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      <div className="cards">

        <motion.div
          className="glass-card"
          variants={cardAnimation}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.07 }}
        >
          <h3>Our Story</h3>
          <p>
            Global Skills Acaedmy was founded to empower students with modern
            digital skills. Our programs combine theory with real-world
            projects so students gain industry-ready experience.
          </p>
        </motion.div>

        <motion.div
          className="glass-card"
          variants={cardAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.07 }}
        >
          <h3>Mission & Vision</h3>
          <p>
            Our mission is to create highly skilled professionals by
            providing hands-on training in technology, programming,
            and digital transformation.
          </p>
        </motion.div>

        <motion.div
          className="glass-card"
          variants={cardAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.07 }}
        >
          <h3>Our Team</h3>
          <p>
            Our expert trainers and mentors bring years of industry
            experience to help students achieve their career goals
            through practical learning and mentorship.
          </p>
        </motion.div>

      </div>

    

      <motion.div
        className="contact-section"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Contact Us</h2>

        <div className="contact-container">

          <div className="contact-box">
            <h4>📍 Address</h4>
            <p>
              Global Skills Acaedmy <br/>
              2nd Floor, Tech Park Building <br/>
              Anna Nagar, Madurai <br/>
              Tamil Nadu - 625020
            </p>
          </div>

          <div className="contact-box">
            <h4>📞 Phone</h4>
            <p>
              +91 98765 43210 <br/>
              +91 91234 56789
            </p>
          </div>

          <div className="contact-box">
            <h4>📧 Email</h4>
            <p>
              info@Globelskills.com <br/>
              support@Globelskillsac.com
            </p>
          </div>

          <div className="contact-box">
            <h4>🌐 Website</h4>
            <p>
              www.Globelskillsacaedmy.com
            </p>
          </div>

        </div>

        <p className="copyright">
          © 2026 Global Skills Accedmy. All Rights Reserved.
        </p>

      </motion.div>

    </div>
  );
};

export default AboutUs;