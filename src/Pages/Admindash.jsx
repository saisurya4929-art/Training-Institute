import AdminSidebar from "./Adminsidebar";
import "../Styles/Admindash.css";

const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="admin-content">
        <div className="admin-dashboard-header">
          <div className="admin-header-left">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back, Admin. Manage courses, students, blogs, placements,
              and gallery content from one premium control panel.
            </p>
          </div>

          <div className="admin-header-badge">
            <span>Live Overview</span>
          </div>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-icon">🎓</span>
              <span className="admin-stat-growth">+12%</span>
            </div>
            <h2>120</h2>
            <p>Total Students</p>
            <small>Compared to last month performance</small>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-icon">📘</span>
              <span className="admin-stat-growth">+4</span>
            </div>
            <h2>18</h2>
            <p>Total Courses</p>
            <small>Active training and certification programs</small>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-icon">🏆</span>
              <span className="admin-stat-growth">+8%</span>
            </div>
            <h2>32</h2>
            <p>Placements</p>
            <small>Placement success improved this quarter</small>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-icon">📝</span>
              <span className="admin-stat-growth">+3</span>
            </div>
            <h2>14</h2>
            <p>Blog Posts</p>
            <small>New content published this month</small>
          </div>
        </div>

        <div className="admin-banner-card">
          <div className="admin-banner-text">
            <h2>Institute Performance Overview</h2>
            <p>
              Track institute growth, monitor student progress, manage training
              content, and improve placement performance with one complete admin
              dashboard.
            </p>
          </div>

          <div className="admin-banner-stats">
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

        <div className="admin-dashboard-sections">
          <div className="admin-section-card large">
            <h3>Recent Activity</h3>
            <ul>
              <li>New course added: Java Full Stack Development</li>
              <li>3 students registered today through online form</li>
              <li>Placement record updated for March batch students</li>
              <li>New blog published on React interview preparation</li>
              <li>Gallery updated with workshop and lab session photos</li>
            </ul>
          </div>

          <div className="admin-section-card">
            <h3>Quick Actions</h3>
            <button>Add New Course</button>
            <button>Upload Gallery Image</button>
            <button>Add Blog Post</button>
            <button>Update Placement</button>
          </div>
        </div>

        <div className="admin-dashboard-sections">
          <div className="admin-section-card large">
            <h3>Management Summary</h3>
            <div className="admin-summary-grid">
              <div className="admin-summary-box">
                <h4>Top Course</h4>
                <p>Java Full Stack Development</p>
              </div>

              <div className="admin-summary-box">
                <h4>Best Department</h4>
                <p>Placement & Training Cell</p>
              </div>

              <div className="admin-summary-box">
                <h4>Upcoming Batches</h4>
                <p>5 New Batches Scheduled</p>
              </div>

              <div className="admin-summary-box">
                <h4>Pending Inquiries</h4>
                <p>11 Student Enquiries to Review</p>
              </div>
            </div>
          </div>

          <div className="admin-section-card">
            <h3>System Status</h3>
            <ul>
              <li>Courses Module: Active</li>
              <li>Blog Module: Active</li>
              <li>Gallery Module: Active</li>
              <li>Placement Module: Active</li>
            </ul>
          </div>
        </div>

        <div className="admin-dashboard-sections">
          <div className="admin-section-card large">
            <h3>Announcements</h3>
            <ul>
              <li>Weekend workshop planned for full stack students</li>
              <li>New internship partner company added this week</li>
              <li>Placement training session starts on Monday</li>
              <li>Monthly admin review meeting scheduled tomorrow</li>
            </ul>
          </div>

          <div className="admin-section-card">
            <h3>Admin Notes</h3>
            <div className="admin-note-box">
              <p>Update homepage banners for new admissions campaign.</p>
            </div>
            <div className="admin-note-box">
              <p>Check pending gallery uploads and blog approvals.</p>
            </div>
            <div className="admin-note-box">
              <p>Review placement page student testimonials section.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;