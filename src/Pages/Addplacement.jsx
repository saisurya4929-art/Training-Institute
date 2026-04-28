import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Addplacement.css";
import AdminSidebar from "./Adminsidebar";
import Modal from "../components/Modal.jsx";
import { toast } from "react-toastify";

const AddPlacement = () => {
  const [placements, setPlacements] = useState([]);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const [formData, setFormData] = useState({
    studentName: "",
    company: "",
    role: "",
    packageAmount: "",
    imageUrl: "",
  });

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/placements");
      setPlacements(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load placements");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      studentName: "",
      company: "",
      role: "",
      packageAmount: "",
      imageUrl: "",
    });

    setEditId(null);
  };

  const handleEdit = (placement) => {
    setEditId(placement.id);

    setFormData({
      studentName: placement.studentName,
      company: placement.company,
      role: placement.role,
      packageAmount: placement.packageAmount,
      imageUrl: placement.imageUrl,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalType("delete");
    setShowModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.warning("Select at least one placement");
      return;
    }

    setModalType("bulk-delete");
    setShowModal(true);
  };

  const confirmDeletePlacement = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting placement...");

    try {
      await axios.delete(
        `http://localhost:8080/api/placements/${deleteId}`,
        authHeader
      );

      toast.update(toastId, {
        render: "Placement deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setDeleteId(null);
      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Failed to delete placement ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmBulkDeletePlacement = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting selected placements...");

    try {
      await axios.delete("http://localhost:8080/api/placements/bulk-delete", {
        data: selectedIds,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.update(toastId, {
        render: "Selected placements deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setSelectedIds([]);
      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Bulk delete failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmUpdatePlacement = async () => {
    setShowModal(false);

    const toastId = toast.loading("Updating placement...");

    try {
      await axios.put(
        `http://localhost:8080/api/placements/${editId}`,
        formData,
        authHeader
      );

      toast.update(toastId, {
        render: "Placement updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Failed to update placement ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.company ||
      !formData.role ||
      !formData.packageAmount ||
      !formData.imageUrl
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (editId) {
      setModalType("update");
      setShowModal(true);
      return;
    }

    const toastId = toast.loading("Adding placement...");

    try {
      await axios.post(
        "http://localhost:8080/api/placements",
        formData,
        authHeader
      );

      toast.update(toastId, {
        render: "Placement added successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Failed to add placement ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="adp-wrap-new">
      <AdminSidebar />

      <main className="adp-main-new">
        <div className="adp-head-new">
          <h1>{editId ? "Edit Placement ✏️" : "Add Placement 🏆"}</h1>
          <p>
            {editId
              ? "Admin can update student placement details here"
              : "Admin can add student placement details here"}
          </p>
        </div>

        <div className="adp-card-new">
          <form onSubmit={handleSubmit} className="adp-form-new">
            <div className="adp-field-new">
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
              />
            </div>

            <div className="adp-field-new">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="adp-field-new">
              <label>Job Role</label>
              <input
                type="text"
                name="role"
                placeholder="Job Role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div className="adp-field-new">
              <label>Package</label>
              <input
                type="text"
                name="packageAmount"
                placeholder="Package (Example: 6 LPA)"
                value={formData.packageAmount}
                onChange={handleChange}
              />
            </div>

            <div className="adp-field-new">
              <label>Student Image URL</label>
              <input
                type="text"
                name="imageUrl"
                placeholder="Student Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="adp-submit-new">
              {editId ? "Update Placement" : "Add Placement"}
            </button>

            {editId && (
              <button
                type="button"
                className="adp-cancel-new"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="adp-list-new">
          <h2>All Placements</h2>

          {selectedIds.length > 0 && (
            <button
              type="button"
              className="adp-delete-new"
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}

          <div className="adp-grid-new">
            {placements.map((placement) => (
              <div className="adp-placement-card-new" key={placement.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(placement.id)}
                  onChange={() => handleSelect(placement.id)}
                />

                <img src={placement.imageUrl} alt={placement.studentName} />

                <div className="adp-placement-info-new">
                  <h3>{placement.studentName}</h3>
                  <p>Company: {placement.company}</p>
                  <p>Role: {placement.role}</p>
                  <p>Package: {placement.packageAmount}</p>

                  <div className="adp-actions-new">
                    <button
                      className="adp-edit-new"
                      onClick={() => handleEdit(placement)}
                    >
                      Edit
                    </button>

                    <button
                      className="adp-delete-new"
                      onClick={() => handleDelete(placement.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalType === "update" ? "Confirm Update" : "Confirm Delete"}
          size="small"
        >
          <p>
            {modalType === "update" &&
              "Are you sure you want to update this placement?"}

            {modalType === "delete" &&
              "Are you sure you want to delete this placement?"}

            {modalType === "bulk-delete" &&
              `Are you sure you want to delete ${selectedIds.length} selected placements?`}
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
                modalType === "update"
                  ? "modal-update-btn"
                  : "modal-delete-btn"
              }
              onClick={
                modalType === "update"
                  ? confirmUpdatePlacement
                  : modalType === "delete"
                  ? confirmDeletePlacement
                  : confirmBulkDeletePlacement
              }
            >
              {modalType === "update" ? "Update" : "Delete"}
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default AddPlacement;