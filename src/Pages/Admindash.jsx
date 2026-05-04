import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import AdminSidebar from "./Adminsidebar";
import Modal from "../components/Modal.jsx";
import "../Styles/Admindash.css";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/users");

      console.log("Users data:", res.data);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Users API Error:", error);
      toast.error(error.response?.data || "Failed to load users");
      setUsers([]);
    }
  };

  const openRoleModal = (id, role) => {
    setSelectedUserId(id);
    setNewRole(role);
    setModalType("role");
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setModalType("delete");
    setShowModal(true);
  };

  const confirmRoleUpdate = async () => {
    setShowModal(false);

    const toastId = toast.loading("Updating role...");

    try {
      await axiosInstance.put(`/api/admin/users/${selectedUserId}/role`, {
        role: newRole,
      });

      toast.update(toastId, {
        render: "Role updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchUsers();
    } catch (error) {
      console.log("Role update error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Failed to update role ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmDeleteUser = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting user...");

    try {
      await axiosInstance.delete(`/api/admin/users/${selectedUserId}`);

      toast.update(toastId, {
        render: "User deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchUsers();
    } catch (error) {
      console.log("Delete user error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Failed to delete user ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;
  const totalStudents = users.filter((user) => user.role === "STUDENT").length;

  return (
    <div className="adm-wrap-new">
      <AdminSidebar />

      <main className="adm-main-new">
        <div className="adm-header-new">
          <div className="adm-header-left-new">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back, Admin. Manage courses, students, blogs, placements,
              gallery content, and users from one premium control panel.
            </p>
          </div>

          <div className="adm-badge-new">
            <span>Live Overview</span>
          </div>
        </div>

        <div className="adm-stats-new">
          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">👥</span>
              <span className="adm-growth-new">Live</span>
            </div>
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
            <small>All registered users</small>
          </div>

          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">🛡️</span>
              <span className="adm-growth-new">Live</span>
            </div>
            <h2>{totalAdmins}</h2>
            <p>Total Admins</p>
            <small>Users with admin access</small>
          </div>

          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">🎓</span>
              <span className="adm-growth-new">Live</span>
            </div>
            <h2>{totalStudents}</h2>
            <p>Total Students</p>
            <small>Registered student users</small>
          </div>

          <div className="adm-card-new">
            <div className="adm-card-top-new">
              <span className="adm-icon-new">📊</span>
              <span className="adm-growth-new">Live</span>
            </div>
            <h2>{totalUsers}</h2>
            <p>User Records</p>
            <small>Live data from database</small>
          </div>
        </div>

        <div className="adm-banner-new">
          <div className="adm-banner-text-new">
            <h2>Institute User Management</h2>
            <p>
              View all registered users, update their role, and remove users
              directly from the admin dashboard.
            </p>
          </div>

          <div className="adm-banner-stats-new">
            <div>
              <h3>{totalUsers}</h3>
              <span>Users</span>
            </div>
            <div>
              <h3>{totalStudents}</h3>
              <span>Students</span>
            </div>
            <div>
              <h3>{totalAdmins}</h3>
              <span>Admins</span>
            </div>
          </div>
        </div>

        <div className="adm-grid-new">
          <div className="adm-panel-new adm-panel-wide-new">
            <h3>User Management</h3>

            <div style={{ overflowX: "auto" }}>
              <table className="adm-user-table-new">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.courses || "N/A"}</td>
                        <td>{user.role}</td>

                        <td>
                          <select
                            value={user.role}
                            onChange={(e) =>
                              openRoleModal(user.id, e.target.value)
                            }
                          >
                            <option value="STUDENT">STUDENT</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="adm-delete-btn-new"
                            onClick={() => openDeleteModal(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="adm-panel-new">
            <h3>Quick Actions</h3>
            <button>Add New Course</button>
            <button>Upload Gallery Image</button>
            <button>Add Blog Post</button>
            <button>Update Placement</button>
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalType === "role" ? "Confirm Role Update" : "Confirm Delete"}
          size="small"
        >
          <p>
            {modalType === "role"
              ? `Are you sure you want to change this user role to ${newRole}?`
              : "Are you sure you want to delete this user?"}
          </p>

          <div className="modal-footer-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className={
                modalType === "role" ? "modal-update-btn" : "modal-delete-btn"
              }
              onClick={
                modalType === "role" ? confirmRoleUpdate : confirmDeleteUser
              }
            >
              {modalType === "role" ? "Update" : "Delete"}
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default AdminDashboard;