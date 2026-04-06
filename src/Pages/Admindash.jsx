import React from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Admindash.css";
const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="admin-content">
        <div className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage courses, students, blog, placements and gallery content.</p>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <h2>120</h2>
            <p>Total Students</p>
          </div>

          <div className="admin-stat-card">
            <h2>18</h2>
            <p>Total Courses</p>
          </div>

          <div className="admin-stat-card">
            <h2>32</h2>
            <p>Placements</p>
          </div>

          <div className="admin-stat-card">
            <h2>14</h2>
            <p>Blog Posts</p>
          </div>
        </div>

        <div className="admin-dashboard-sections">
          <div className="admin-section-card large">
            <h3>Recent Activity</h3>
            <ul>
              <li>New course added: Java Full Stack</li>
              <li>3 students registered today</li>
              <li>Placement record updated</li>
              <li>New blog published</li>
            </ul>
          </div>

          <div className="admin-section-card">
            <h3>Quick Actions</h3>
            <button>Add New Course</button>
            <button>Upload Gallery Image</button>
            <button>Add Blog Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
