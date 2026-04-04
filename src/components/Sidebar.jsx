
import "../Styles/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";


const Sidebar = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Training Institute</h2>

      <div className="student-box">
        
        <h4>{student?.name}</h4>
        <p>Student</p>
      </div>

      <nav>
        <Link to="/mycourses">My Courses</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;