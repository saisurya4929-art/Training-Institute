import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/AdminSidebar.css";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const admin =JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");

    };

    return(
        <div className="admin-sidebar">
            <div className="admin-logo">
                <h2>Admin panel</h2>
                <p>Globel Skills acaedmy</p>
            </div>
            
            <div className="admin-profile-box">
                <h3>{admin?.name || "Admin"}</h3>
                <span>Administrator</span>
                </div>

             <nav className="admin-nav">
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/add-course">Add Course</Link>
                <Link to="/admin/gallery">Gallery Upload</Link>
                <Link to="/admin/blog">Add Blog</Link>
                <Link to="/admin/placement">Add Placement</Link>
            </nav>

            <button className="admin-logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default AdminSidebar;