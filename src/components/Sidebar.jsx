import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";


const StudentSidebar = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="sd-sidebar">
      <div className="sd-sidebar-top">
        <div className="sd-sidebar-brand">
          <div className="sd-sidebar-brand-icon">🎓</div>
          <div>
            <h2>Training</h2>
            <p>Institute</p>
          </div>
        </div>

        <div className="sd-sidebar-userbox">
          <div className="sd-sidebar-user-avatar">
            {(student?.name || "S").charAt(0).toUpperCase()}
          </div>
          <div>
            <h4>{student?.name || "Student"}</h4>
            <span>Keep growing every day 🚀</span>
          </div>
        </div>

        <nav className="sd-sidebar-menu">
          <NavLink to="/studentdashboard">Dashboard</NavLink>
          <NavLink to="/mycourses">My Courses</NavLink>
          <NavLink to="/upload">Upload Documents</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </div>

      <button className="sd-sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default StudentSidebar;