
import React from "react";
import "../styles/MyCourses.css";
import Sidebar from "../components/Sidebar";

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
    <div className="page">
      
      <Sidebar />

      <div className="content">

        <h2>My Courses</h2>

        <div className="course-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>

              <h3>{course.title}</h3>

              <p>👨‍🏫 Instructor: {course.instructor}</p>
              <p>📅 Duration: {course.duration}</p>

              <div className="progress-wrapper">
                <div className="progress-bar">
                  <div 
                    className="progress"
                    style={{width: `${course.progress}%`}}
                  ></div>
                </div>
                <span>{course.progress}%</span>
              </div>

              <div className="status">
                {course.status}
              </div>

              <button className="continue-btn">
                Continue Learning
              </button>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default MyCourses;