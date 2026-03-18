import React from "react";
import "../Styles/Infosection.css";

function InfoSection() {
  return (
    <section className="info-section">

      <div className="info-box">
        <h3>Popular Courses</h3>
        <p>Explore our most demanded courses like Java Full Stack, MERN Stack, and Python Development.</p>
      </div>

      <div className="info-box">
        <h3>Testimonials</h3>
        <p>Hear from our successful students who started their IT careers after training with us.</p>
      </div>

      <div className="info-box">
        <h3>Placement Highlights</h3>
        <p>Our students are placed in top companies with attractive salary packages.</p>
      </div>

    </section>
  );
}

export default InfoSection;
