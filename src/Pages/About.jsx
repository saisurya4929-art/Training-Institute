import React from "react";
import { motion } from "framer-motion";
import "../Styles/About.css";
import logo1 from "../assets/logoimg2.jpeg"

const fadeUp = {
  hidden: { opacity: 0, y: 70 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const AboutUs = () => {
  return (
    <div className="about-modern-page">
      <div className="about-bg-circle about-circle-one"></div>
      <div className="about-bg-circle about-circle-two"></div>
      <div className="about-bg-circle about-circle-three"></div>

      <header className="about-topbar">
        <div className="about-logo-box">
        <img src={logo1} className="about-logo-img"
          />
    </div>
        <h2 className="about-brand-logo">Global Skills Acaedmy</h2>
      </header>

      <section className="about-hero-section">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="about-hero-tag">About Our Institute</span>
          <h1 className="about-main-title">Build Skills. Build Confidence. Build Your Career.</h1>
          <p className="about-hero-text">
            Global Skills Acaedmy was founded to empower students with modern digital
            skills. Our programs combine theory with real-world projects so students
            gain industry-ready experience and build a strong future in technology.
          </p>
        </motion.div>
      </section>

      <section className="about-stats-section">
        <motion.div
          className="about-stat-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h3>500+</h3>
          <p>Students Trained</p>
        </motion.div>

        <motion.div
          className="about-stat-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h3>20+</h3>
          <p>Industry Courses</p>
        </motion.div>

        <motion.div
          className="about-stat-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h3>100+</h3>
          <p>Placement Support Sessions</p>
        </motion.div>

        <motion.div
          className="about-stat-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <h3>24/7</h3>
          <p>Learning Guidance</p>
        </motion.div>
      </section>

      <section className="about-card-section">
        <motion.div
          className="about-glass-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          whileHover={{ y: -10, scale: 1.03 }}
        >
          <div className="about-card-icon">📖</div>
          <h3>Our Story</h3>
          <p>
            Global Skills Acaedmy was founded to empower students with modern
            digital skills. Our programs combine theory with real-world
            projects so students gain industry-ready experience.
          </p>
        </motion.div>

        <motion.div
          className="about-glass-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          whileHover={{ y: -10, scale: 1.03 }}
        >
          <div className="about-card-icon">🎯</div>
          <h3>Mission & Vision</h3>
          <p>
            Our mission is to create highly skilled professionals by
            providing hands-on training in technology, programming,
            and digital transformation.
          </p>
        </motion.div>

        <motion.div
          className="about-glass-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          whileHover={{ y: -10, scale: 1.03 }}
        >
          <div className="about-card-icon">👨‍🏫</div>
          <h3>Our Team</h3>
          <p>
            Our expert trainers and mentors bring years of industry
            experience to help students achieve their career goals
            through practical learning and mentorship.
          </p>
        </motion.div>
      </section>

      <section className="about-extra-section">
        <motion.div
          className="about-extra-left"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="about-section-tag">Why Students Choose Us</span>
          <h2>Industry-Focused Learning Experience</h2>
          <p>
            We focus on practical knowledge, modern technologies, and career-ready
            learning methods. Our students get exposure to real-time projects,
            expert guidance, and a supportive learning environment.
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
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="about-highlight-box">
            <h3>Our Commitment</h3>
            <p>
              We are committed to helping every student become confident,
              skilled, and job-ready through high-quality training and
              continuous mentorship.
            </p>
          </div>

          <div className="about-highlight-box">
            <h3>Career Growth</h3>
            <p>
              We support students not only in learning technology but also
              in building professional confidence for interviews, teamwork,
              and long-term career growth.
            </p>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="about-contact-section"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
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
              Global Skills Acaedmy <br />
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
              info@Globelskills.com <br />
              support@Globelskillsac.com
            </p>
          </div>

          <div className="about-contact-box">
            <h4>🌐 Website</h4>
            <p>www.Globelskillsacaedmy.com</p>
          </div>
        </div>

        <p className="about-footer-text">
          © 2026 Global Skills Accedmy. All Rights Reserved.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutUs;