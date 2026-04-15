import React from "react";
import { motion } from "framer-motion";
import "../Styles/About.css";
import logo1 from "../assets/logoimg2.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 70 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -70 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 70 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const AboutUs = () => {
  return (
    <div className="about-modern-page">
      <div className="about-bg-circle about-circle-one"></div>
      <div className="about-bg-circle about-circle-two"></div>
      <div className="about-bg-circle about-circle-three"></div>

      <motion.header
        className="about-topbar"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="about-logo-box">
          <img src={logo1} className="about-logo-img" alt="Global Skills Academy" />
        </div>
        <h2 className="about-brand-logo">Global Skills Academy</h2>
      </motion.header>

      <section className="about-hero-section">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          <span className="about-hero-tag">About Our Institute</span>
          <h1 className="about-main-title">
            Build Skills. Build Confidence. Build Your Career.
          </h1>
          <p className="about-hero-text">
            Global Skills Academy empowers students with modern technology skills,
            practical learning, and real-world project exposure to help them become
            confident and job-ready professionals.
          </p>
        </motion.div>
      </section>

      <section className="about-stats-section">
        {[ 
          { number: "500+", text: "Students Trained" },
          { number: "20+", text: "Industry Courses" },
          { number: "100+", text: "Placement Support Sessions" },
          { number: "24/7", text: "Learning Guidance" },
        ].map((item, index) => (
          <motion.div
            className="about-stat-card"
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index + 1}
          >
            <h3>{item.number}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="about-card-section">
        <motion.div
          className="about-glass-card"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="about-card-icon">📖</div>
          <h3>Our Story</h3>
          <p>
            We started with a clear goal: to make technology training more practical,
            more modern, and more connected to real industry needs.
          </p>
        </motion.div>

        <motion.div
          className="about-glass-card"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={2}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="about-card-icon">🎯</div>
          <h3>Mission & Vision</h3>
          <p>
            Our mission is to build highly skilled professionals through project-based
            training, interview readiness, and strong career guidance.
          </p>
        </motion.div>

        <motion.div
          className="about-glass-card"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={3}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="about-card-icon">👨‍🏫</div>
          <h3>Expert Mentors</h3>
          <p>
            Our trainers bring industry knowledge, practical teaching methods,
            and mentorship that helps students move confidently toward their goals.
          </p>
        </motion.div>
      </section>

      <section className="about-extra-section">
        <motion.div
          className="about-extra-left"
          variants={fadeLeft}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="about-section-tag">Why Students Choose Us</span>
          <h2>Industry-Focused Learning Experience</h2>
          <p>
            We focus on practical knowledge, live project exposure, updated technologies,
            and a supportive learning environment that prepares students for real careers.
          </p>

          <div className="about-feature-list">
            <div className="about-feature-item">✔ Practical Training</div>
            <div className="about-feature-item">✔ Real-Time Projects</div>
            <div className="about-feature-item">✔ Interview Preparation</div>
            <div className="about-feature-item">✔ Placement Guidance</div>
          </div>
        </motion.div>

        <motion.div
          className="about-extra-right"
          variants={fadeRight}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="about-highlight-box">
            <h3>Our Commitment</h3>
            <p>
              We are committed to helping every student become skilled, confident,
              and ready for a successful professional future.
            </p>
          </div>

          <div className="about-highlight-box">
            <h3>Career Growth</h3>
            <p>
              We support students in learning technology, improving communication,
              and building strong confidence for interviews and team environments.
            </p>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="about-contact-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <div className="about-contact-header">
          <span className="about-section-tag">Get In Touch</span>
          <h2>Contact Us</h2>
          <p>
            Reach out to us for course details, career guidance, and enrollment support.
          </p>
        </div>

        <div className="about-contact-grid">
          <div className="about-contact-box">
            <h4>📍 Address</h4>
            <p>
              Global Skills Academy <br />
              2nd Floor, Tech Park Building <br />
              Anna Nagar, Madurai <br />
              Tamil Nadu - 625020
            </p>
          </div>

          <div className="about-contact-box">
            <h4>📞 Phone</h4>
            <p>
              +91 98765 43210 <br />
              +91 91234 56789
            </p>
          </div>

          <div className="about-contact-box">
            <h4>📧 Email</h4>
            <p>
              info@globalskills.com <br />
              support@globalskillsacademy.com
            </p>
          </div>

          <div className="about-contact-box">
            <h4>🌐 Website</h4>
            <p>www.globalskillsacademy.com</p>
          </div>
        </div>

        <p className="about-footer-text">
          © 2026 Global Skills Academy. All Rights Reserved.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutUs;