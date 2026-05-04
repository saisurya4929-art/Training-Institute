import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import AdminSidebar from "./Adminsidebar";
import Modal from "../components/Modal.jsx";
import "../Styles/Addcourse.css";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/api/courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Fetch courses error:", error);
      toast.error(error.response?.data || "Failed to load courses");
      setCourses([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      imageUrl: "",
    });
    setEditId(null);
  };

  const handleEdit = (course) => {
    setEditId(course.id);

    setFormData({
      title: course.title || "",
      description: course.description || "",
      duration: course.duration || "",
      imageUrl: course.imageUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalType("delete");
    setShowModal(true);
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.warning("Select at least one course");
      return;
    }

    setModalType("bulkDelete");
    setShowModal(true);
  };

  const confirmBulkDelete = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting selected courses...");

    try {
      await axiosInstance.delete("/api/courses/bulk-delete", {
        data: selectedIds,
      });

      toast.update(toastId, {
        render: "Selected courses deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setSelectedIds([]);
      fetchCourses();
    } catch (error) {
      console.log("Bulk delete error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Bulk delete failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmDeleteCourse = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting course...");

    try {
      await axiosInstance.delete(`/api/courses/${deleteId}`);

      toast.update(toastId, {
        render: "Course deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setDeleteId(null);
      fetchCourses();
    } catch (error) {
      console.log("Delete course error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Failed to delete course ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmUpdateCourse = async () => {
    setShowModal(false);

    const toastId = toast.loading("Updating course...");

    try {
      await axiosInstance.put(`/api/courses/${editId}`, formData);

      toast.update(toastId, {
        render: "Course updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchCourses();
    } catch (error) {
      console.log("Update course error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Failed to update course ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.duration.trim() ||
      !formData.imageUrl.trim()
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (editId) {
      setModalType("update");
      setShowModal(true);
      return;
    }

    const toastId = toast.loading("Adding course...");

    try {
      await axiosInstance.post("/api/courses", formData);

      toast.update(toastId, {
        render: "Course added successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchCourses();
    } catch (error) {
      console.log("Add course error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Failed to add course ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const getModalTitle = () => {
    if (modalType === "update") return "Confirm Update";
    if (modalType === "bulkDelete") return "Confirm Bulk Delete";
    return "Confirm Delete";
  };

  const getModalMessage = () => {
    if (modalType === "update") {
      return "Are you sure you want to update this course?";
    }

    if (modalType === "bulkDelete") {
      return `Are you sure you want to delete ${selectedIds.length} selected courses?`;
    }

    return "Are you sure you want to delete this course?";
  };

  const getModalAction = () => {
    if (modalType === "update") return confirmUpdateCourse;
    if (modalType === "bulkDelete") return confirmBulkDelete;
    return confirmDeleteCourse;
  };

  return (
    <div className="adc-wrap-new">
      <AdminSidebar />

      <main className="adc-main-new">
        <div className="adc-head-new">
          <h1>{editId ? "Edit Course ✏️" : "Add New Course 📘"}</h1>
        </div>

        <div className="adc-card-new">
          <form onSubmit={handleSubmit} className="adc-form-new">
            <div className="adc-field-new">
              <label>Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
              />
            </div>

            <div className="adc-field-new">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Example: 3 Months"
              />
            </div>

            <div className="adc-field-new">
              <label>Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            <div className="adc-field-new adc-textarea-new">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter course description"
              />
            </div>

            <button type="submit" className="adc-submit-new">
              {editId ? "Update Course" : "Add Course"}
            </button>

            {editId && (
              <button
                type="button"
                className="adc-cancel-new"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="adc-list-new">
          <div className="adc-list-head-new">
            <h2>All Courses</h2>

            {selectedIds.length > 0 && (
              <button
                type="button"
                className="adc-delete-new"
                onClick={handleBulkDelete}
              >
                Delete Selected ({selectedIds.length})
              </button>
            )}
          </div>

          <div className="adc-course-grid-new">
            {courses.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              courses.map((course) => (
                <div className="adc-course-card-new" key={course.id}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(course.id)}
                    onChange={() => handleSelect(course.id)}
                  />

                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300";
                    }}
                  />

                  <div className="adc-course-info-new">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <h4>{course.duration}</h4>

                    <div className="adc-actions-new">
                      <button
                        type="button"
                        className="adc-edit-new"
                        onClick={() => handleEdit(course)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="adc-delete-new"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={getModalTitle()}
          size="small"
        >
          <p>{getModalMessage()}</p>

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
              onClick={getModalAction()}
            >
              {modalType === "update" ? "Update" : "Delete"}
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default AddCourse;