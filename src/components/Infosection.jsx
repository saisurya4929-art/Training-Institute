import React from "react";
import "../Styles/Infosection.css";

function InfoSection() {
  const infoData = [
    {
      icon: "🎯",
      title: "Popular Courses",
      text: "Explore our top-rated programs like Java Full Stack, MERN Stack, Python Development, UI/UX Design, and Software Testing with practical project training.",
    },
    {
      icon: "💼",
      title: "Placement Support",
      text: "We provide strong placement assistance with resume building, mock interviews, aptitude preparation, soft skills training, and company referral guidance.",
    },
    {
      icon: "🌟",
      title: "Student Success",
      text: "Hundreds of students have successfully started their IT careers after completing our training programs and gaining real-world project experience.",
    },
    {
      icon: "🧑‍🏫",
      title: "Expert Trainers",
      text: "Learn from experienced industry professionals who guide you with live coding sessions, real-time examples, and one-to-one support.",
    },
    {
      icon: "📚",
      title: "Hands-on Learning",
      text: "Every course includes assignments, mini projects, case studies, and final project work so students gain practical confidence before interviews.",
    },
    {
      icon: "🚀",
      title: "Career Growth",
      text: "Our programs are designed to help freshers and job seekers improve technical skills, crack interviews, and build a strong IT career path.",
    },
  ];

  return (
    <section className="info-modern-section">
      <div className="info-modern-header">
        <span className="info-modern-tag">Why Choose Us</span>
        <h2>Transform Your Future With Industry-Focused Training</h2>
        <p>
          We help students build strong technical knowledge, practical skills,
          and career confidence through premium training programs.
        </p>
      </div>

      <div className="info-modern-grid">
        {infoData.map((item, index) => (
          <div className="info-modern-card" key={index}>
            <div className="info-modern-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="info-modern-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoSection;
