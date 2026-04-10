import "../Styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("student")) ||
    JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🎓 Training Institute</h2>

      <div className="student-box">
        <h4>{student?.name || "Student"}</h4>
        <p>Student</p>
      </div>

      <nav>
        <NavLink to="/studentdashboard" end>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/mycourses">
          📚 My Courses
        </NavLink>

        <NavLink to="/upload">
          📂 Upload
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>
      </nav>

      <button className="logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;