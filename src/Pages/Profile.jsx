
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../Styles/profile.css";

const Profile = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("student"));
    if (data) setStudent(data);
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem("student", JSON.stringify(student));
    alert("Profile Updated Successfully");
  };

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-content">
        <h2>Student Profile</h2>

        <div className="profile-card">

          {/* LEFT SIDE */}
          <div className="profile-left">
            <h3 className="student-name">
              Welcome, {student.name}
            </h3>

            <p className="student-text">
              Track your learning progress, update your details and 
              manage your courses from this dashboard.
            </p>

            <div className="progress-section">
              <h4>Progress Stats</h4>

              <div className="stat">
                <span>Course Completion</span>
                <div className="progress-bar">
                  <div className="progress fill1"></div>
                </div>
              </div>

              <div className="stat">
                <span>Study Hours</span>
                <div className="progress-bar">
                  <div className="progress fill2"></div>
                </div>
              </div>

              <div className="stat">
                <span>Assignments</span>
                <div className="progress-bar">
                  <div className="progress fill3"></div>
                </div>
              </div>

              <div className="stat">
                <span>Test Score</span>
                <div className="progress-bar">
                  <div className="progress fill4"></div>
                </div>
              </div>

              <div className="stat">
                <span>Attendance</span>
                <div className="progress-bar">
                  <div className="progress fill5"></div>
                </div>
              </div>

              <div className="stat">
                <span>Enrolled Courses</span>
                <div className="progress-bar">
                  <div className="progress fill6"></div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="profile-form">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={student.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={student.course}
                onChange={handleChange}
              />
            </div>

            <button onClick={handleSave}>
              Update Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;