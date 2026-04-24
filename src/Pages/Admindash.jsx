import React from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Admindash.css";

const AdminDashboard = () => {
  return (
    <div className="adm-wrap-new">
      <AdminSidebar />

      <main className="adm-main-new">
        <div className="adm-header-new">
          <div className="adm-header-left-new">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back, Admin. Manage courses, students, blogs, placements,
              and gallery content from one premium control panel.
            </p>
          </div>

          <div className="adm-badge-new">
            <span>Live Overview</span>
          </div>
        </div>

        <div className="adm-stats-new">
          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">🎓</span>
              <span className="adm-growth-new">+12%</span>
            </div>
            <h2>120</h2>
            <p>Total Students</p>
            <small>Compared to last month performance</small>
          </div>

          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">📘</span>
              <span className="adm-growth-new">+4</span>
            </div>
            <h2>18</h2>
            <p>Total Courses</p>
            <small>Active training and certification programs</small>
          </div>

          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">🏆</span>
              <span className="adm-growth-new">+8%</span>
            </div>
            <h2>32</h2>
            <p>Placements</p>
            <small>Placement success improved this quarter</small>
          </div>

          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">📝</span>
              <span className="adm-growth-new">+3</span>
            </div>
            <h2>14</h2>
            <p>Blog Posts</p>
            <small>New content published this month</small>
          </div>
        </div>

        <div className="adm-banner-new">
          <div className="adm-banner-text-new">
            <h2>Institute Performance Overview</h2>
            <p>
              Track institute growth, monitor student progress, manage training
              content, and improve placement performance with one complete admin
              dashboard.
            </p>
          </div>

          <div className="adm-banner-stats-new">
            <div>
              <h3>92%</h3>
              <span>Attendance</span>
            </div>
            <div>
              <h3>87%</h3>
              <span>Completion Rate</span>
            </div>
            <div>
              <h3>95%</h3>
              <span>Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="adm-grid-new">
          <div className="adm-panel-new adm-panel-wide-new">
            <h3>Recent Activity</h3>
            <ul>
              <li>New course added: Java Full Stack Development</li>
              <li>3 students registered today through online form</li>
              <li>Placement record updated for March batch students</li>
              <li>New blog published on React interview preparation</li>
              <li>Gallery updated with workshop and lab session photos</li>
            </ul>
          </div>

          <div className="adm-panel-new">
            <h3>Quick Actions</h3>
            <button>Add New Course</button>
            <button>Upload Gallery Image</button>
            <button>Add Blog Post</button>
            <button>Update Placement</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;