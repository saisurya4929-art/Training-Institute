import React from "react";
import Sidebar from "../components/Sidebar";
import "../Styles/StudentCommon.css";
import "../Styles/MyCourses.css";

const MyCourses = () => {
  const student = JSON.parse(localStorage.getItem("user"));

  const courses = [
    {
      id: 1,
      title: "Java Full Stack Development",
      subtitle: "Frontend + Backend + Database",
      trainer: "Mr. Arun",
      duration: "6 Months",
      progress: 80,
      lessons: 48,
      projects: 6,
      icon: "💻",
      colorClass: "course-theme-blue",
    },
    {
      id: 2,
      title: "Spring Boot Development",
      subtitle: "REST API + JPA + MySQL",
      trainer: "Ms. Kavya",
      duration: "3 Months",
      progress: 68,
      lessons: 30,
      projects: 4,
      icon: "⚙️",
      colorClass: "course-theme-purple",
    },
    {
      id: 3,
      title: "React JS UI Design",
      subtitle: "Modern UI + Responsive Design",
      trainer: "Mr. Vimal",
      duration: "2 Months",
      progress: 90,
      lessons: 24,
      projects: 3,
      icon: "🎨",
      colorClass: "course-theme-pink",
    },
    {
      id: 4,
      title: "MySQL Database",
      subtitle: "Queries + Tables + Joins",
      trainer: "Mrs. Nivetha",
      duration: "2 Months",
      progress: 72,
      lessons: 20,
      projects: 2,
      icon: "🗄️",
      colorClass: "course-theme-green",
    },
  ];

  return (
    <div className="student-page-wrapper">
      <Sidebar />

      <div className="student-page-content">
        <div className="student-course-main2">
          <div className="student-course-header2">
            <div>
              <h1 className="student-page-title">
                {student?.name || "Student"}'s Learning Space
              </h1>

              <p className="student-page-subtitle">
                Explore your enrolled courses, track progress, and complete your
                assignments in one modern learning page.
              </p>
            </div>

            <div className="student-course-user2">
              <div className="student-course-user-avatar2">
                {(student?.name || "S").charAt(0).toUpperCase()}
              </div>
              <div>
                <h4>{student?.name || "Student"}</h4>
                <span>Course Explorer</span>
              </div>
            </div>
          </div>

          <div className="student-course-summary2">
            <div className="student-course-mini2">
              <h3>4</h3>
              <p>Active Courses</p>
            </div>
            <div className="student-course-mini2">
              <h3>82%</h3>
              <p>Average Progress</p>
            </div>
            <div className="student-course-mini2">
              <h3>4</h3>
              <p>Assignments</p>
            </div>
            <div className="student-course-mini2">
              <h3>2</h3>
              <p>Pending Tasks</p>
            </div>
          </div>

          <div className="student-course-grid2">
            {courses.map((course) => (
              <div
                className={`student-course-card2 ${course.colorClass}`}
                key={course.id}
              >
                <div className="student-course-top2">
                  <div className="student-course-icon2">{course.icon}</div>
                  <span className="student-course-status2">Active</span>
                </div>

                <h3>{course.title}</h3>
                <h5>{course.subtitle}</h5>

                <div className="student-course-info-grid2">
                  <div className="student-course-info-box2">
                    <small>Trainer</small>
                    <strong>{course.trainer}</strong>
                  </div>

                  <div className="student-course-info-box2">
                    <small>Duration</small>
                    <strong>{course.duration}</strong>
                  </div>

                  <div className="student-course-info-box2">
                    <small>Lessons</small>
                    <strong>{course.lessons}</strong>
                  </div>

                  <div className="student-course-info-box2">
                    <small>Projects</small>
                    <strong>{course.projects}</strong>
                  </div>
                </div>

                <div className="student-course-progress-head2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="student-course-progress2">
                  <div
                    className="student-course-progress-fill2"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <div className="student-course-btn-row2">
                  <button className="student-course-primary2">Continue</button>
                  <button className="student-course-secondary2">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;