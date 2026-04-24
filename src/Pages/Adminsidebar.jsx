import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/AdminSidebar.css";
import Modal from "../components/Modal";
import ThemeToggle from "../components/ThemeToggle";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/add-course", label: "Add Course", icon: "📘" },
    { path: "/admin/gallery", label: "Gallery Upload", icon: "🖼️" },
    { path: "/admin/blog", label: "Add Blog", icon: "📝" },
    { path: "/admin/placement", label: "Add Placement", icon: "🏆" },
  ];

  return (
    <>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-logo-box">
            <div className="admin-logo-icon">🎓</div>
            <div>
              <h2>Admin Panel</h2>
              <p>Globel Skills Academy</p>
            </div>
          </div>

          <div className="admin-profile-card">
            <div className="admin-avatar">
              {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
            </div>

            <div className="admin-profile-text">
              <h3>Admin</h3>
              <span>Administrator</span>
            </div>
          </div>

          <nav className="admin-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="admin-sidebar-bottom">
          <ThemeToggle />

          <button
            className="admin-logout-btn"
            onClick={() => setOpenLogout(true)}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <Modal
        isOpen={openLogout}
        onClose={() => setOpenLogout(false)}
        title="Confirm Logout"
        footer={
          <>
            <button
              className="modal-btn modal-btn-cancel"
              onClick={() => setOpenLogout(false)}
            >
              Cancel
            </button>
            <button className="modal-btn modal-btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        }
      >
        <p>Are you sure you want to logout from the admin account?</p>
      </Modal>
    </>
  );
};

export default AdminSidebar;