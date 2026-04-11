import '../Styles/Studentdashboard.css';
import React from "react";
import Sidebar from "../components/Sidebar";

const StudentDashboard = () => {
  const student = JSON.parse(localStorage.getItem("user"));

  const recentActivities = [
    "Completed Java OOP module",
    "Uploaded semester certificate",
    "Updated profile details",
    "Started React UI lesson",
  ];

  const courses = [
    {
      id: 1,
      title: "Java Full Stack",
      progress: 82,
      icon: "💻",
    },
    {
      id: 2,
      title: "Spring Boot",
      progress: 68,
      icon: "⚙️",
    },
    {
      id: 3,
      title: "React UI Design",
      progress: 90,
      icon: "🎨",
    },
  ];

  return (
    <div className="sdb-page">
      <Sidebar />

      <main className="sdb-main">
        <div className="sdb-topbar">
          <div>
            <h1>Hello, {student?.name || "Student"} 👋</h1>
            <p>
              Welcome back to your student portal. Keep learning, keep building,
              and move one step closer to your dream career.
            </p>
          </div>

          <div className="sdb-profile-mini">
            <div className="sdb-profile-avatar">
              {(student?.name || "S").charAt(0).toUpperCase()}
            </div>
            <div>
              <h4>{student?.name || "Student"}</h4>
              <span>{student?.role || "STUDENT"}</span>
            </div>
          </div>
        </div>
        <section className="sdb-stats-grid">
          <div className="sdb-stat-card blue">
            <div className="sdb-stat-icon">📚</div>
            <div>
              <h3>04</h3>
              <p>Enrolled Courses</p>
            </div>
          </div>

          <div className="sdb-stat-card purple">
            <div className="sdb-stat-icon">📈</div>
            <div>
              <h3>82%</h3>
              <p>Overall Progress</p>
            </div>
          </div>

          <div className="sdb-stat-card orange">
            <div className="sdb-stat-icon">📝</div>
            <div>
              <h3>12</h3>
              <p>Assignments Done</p>
            </div>
          </div>

          <div className="sdb-stat-card green">
            <div className="sdb-stat-icon">🏆</div>
            <div>
              <h3>05</h3>
              <p>Achievements</p>
            </div>
          </div>
        </section>

        <section className="sdb-content-grid">
          <div className="sdb-left-column">
            <div className="sdb-glass-card">
              <div className="sdb-card-head">
                <h3>My Course Preview</h3>
                <span>Active learning</span>
              </div>

              <div className="sdb-course-list">
                {courses.map((course) => (
                  <div className="sdb-course-item" key={course.id}>
                    <div className="sdb-course-icon">{course.icon}</div>

                    <div className="sdb-course-info">
                      <h4>{course.title}</h4>

                      <div className="sdb-course-progress-top">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>

                      <div className="sdb-course-progress-bar">
                        <div
                          className="sdb-course-progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sdb-right-column">
            <div className="sdb-glass-card">
              <div className="sdb-card-head">
                <h3>Student Summary</h3>
              </div>

              <div className="sdb-summary-box">
                <h4>{student?.name || "Student"}</h4>
                <p>Email: {student?.email || "student@gmail.com"}</p>
                <p>Role: {student?.role || "STUDENT"}</p>
                <p>Status: Active learner</p>
                <p className="sdb-summary-note">
                  Stay consistent, {student?.name || "Student"}. Your daily
                  progress builds your future.
                </p>
              </div>
            </div>

            <div className="sdb-glass-card">
              <div className="sdb-card-head">
                <h3>Recent Activities</h3>
                <span>Latest updates</span>
              </div>

              <div className="sdb-activity-list">
                {recentActivities.map((item, index) => (
                  <div className="sdb-activity-item" key={index}>
                    <div className="sdb-activity-dot"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;