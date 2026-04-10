import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Courses.css";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log("Error fetching courses:", err);
      });
  }, []);

  return (
    <div className="courses-container">
      <div className="logo1-header">
        <div className="logo1">Globel Skills Acaedmy</div>

        <div className="header-buttons">
          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      <section className="hero-tn">
        <div className="hero-overlay">
          <h1>Build Your Career in IT Industry</h1>

          <p>
            Join our industry oriented training programs designed by experienced
            developers and mentors. Learn practical development skills and work
            on real-world projects.
          </p>

          <div className="hero-cards">
            <div className="card">
              <h3>Industry Experts</h3>
              <p>Learn from professionals working in top IT companies.</p>
            </div>

            <div className="card">
              <h3>Live Projects</h3>
              <p>Work on real applications like company projects.</p>
            </div>

            <div className="card">
              <h3>Placement Support</h3>
              <p>Resume preparation, mock interviews and job referrals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-courses-section">
        <h2 className="modern-course-title">Our Popular Courses</h2>
        <p className="modern-course-subtitle">
          Choose the right course and become job ready with practical training,
          live projects and placement support.
        </p>

        <div className="modern-course-grid">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div className="modern-course-card" key={course.id}>
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="modern-course-img"
                />
                <div className="modern-course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <span>Duration: {course.duration}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-courses-text">No courses available</p>
          )}
        </div>
      </section>

      <section className="course-details">
        <h2>Why Choose Our Institute</h2>

        <p>
          Our training programs are designed to make students industry ready.
          We provide practical coding sessions, project development, and
          technical interview preparation.
        </p>

        <div className="details-grid">
          <div>
            <h4>Course Duration</h4>
            <p>3 to 6 Months</p>
          </div>

          <div>
            <h4>Training Mode</h4>
            <p>Online / Offline</p>
          </div>

          <div>
            <h4>Certification</h4>
            <p>Industry Recognized Certificate</p>
          </div>

          <div>
            <h4>Internship</h4>
            <p>Real project experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;