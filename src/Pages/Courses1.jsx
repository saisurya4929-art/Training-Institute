import React from "react";
import Sidebar from "../components/Sidebar";
import "../Styles/MyCourses.css";

const MyCourses = () => {

  const courses = [
    {
      title: "Full Stack Development",
      progress: 70,
      instructor: "John Doe",
      duration: "6 Months",
      status: "In Progress"
    },
    {
      title: "React JS",
      progress: 40,
      instructor: "David Smith",
      duration: "3 Months",
      status: "In Progress"
    },
    {
      title: "Java Backend",
      progress: 100,
      instructor: "Michael Lee",
      duration: "4 Months",
      status: "Completed"
    }
  ];

  return (
    <div className="courses-page">

      <Sidebar />

      <div className="courses-content">

        {/* Header */}
        <div className="courses-header">
          <h2>My Learning</h2>
          <p>Track your progress and continue learning 🚀</p>
        </div>

        {/* Course Grid */}
        <div className="course-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>

              <div className="card-top">
                <h3>{course.title}</h3>
                <span className={`status ${course.status === "Completed" ? "done" : ""}`}>
                  {course.status}
                </span>
              </div>

              <p>👨‍🏫 {course.instructor}</p>
              <p>📅 {course.duration}</p>

              {/* Progress */}
              <div className="progress-box">
                <div className="progress-bar">
                  <div 
                    className="progress"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span>{course.progress}%</span>
              </div>

              <button className="continue-btn">
                Continue
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyCourses;