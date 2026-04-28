import React, { useEffect, useState } from "react";
import axios from "axios";
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

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/courses");
      setCourses(res.data);
    } catch (error) {
      toast.error("Failed to load courses");
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
      title: course.title,
      description: course.description,
      duration: course.duration,
      imageUrl: course.imageUrl,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalType("delete");
    setShowModal(true);
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.warning("Select at least one course");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete selected courses?"
    );

    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting selected courses...");

    try {
      await axios.delete(
        "http://localhost:8080/api/courses/bulk-delete",
        {
          data: selectedIds,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.update(toastId, {
        render: "Selected courses deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setSelectedIds([]);
      fetchCourses();
    } catch (error) {
      toast.update(toastId, {
        render: "Bulk delete failed ❌",
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
      await axios.delete(
        `http://localhost:8080/api/courses/${deleteId}`,
        authHeader
      );

      toast.update(toastId, {
        render: "Course deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchCourses();
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to delete course ❌",
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
      await axios.put(
        `http://localhost:8080/api/courses/${editId}`,
        formData,
        authHeader
      );

      toast.update(toastId, {
        render: "Course updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchCourses();
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to update course ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.duration ||
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

    const toastId = toast.loading("Adding course...");

    try {
      await axios.post(
        "http://localhost:8080/api/courses",
        formData,
        authHeader
      );

      toast.update(toastId, {
        render: "Course added successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchCourses();
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to add course ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
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
              />
            </div>

            <div className="adc-field-new">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="adc-field-new">
              <label>Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="adc-field-new adc-textarea-new">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
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
          <h2>All Courses</h2>

          {selectedIds.length > 0 && (
            <button
              className="adc-delete-new"
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}

          <div className="adc-course-grid-new">
            {courses.map((course) => (
              <div className="adc-course-card-new" key={course.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(course.id)}
                  onChange={() => handleSelect(course.id)}
                />

                <img src={course.imageUrl} alt={course.title} />

                <div className="adc-course-info-new">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <h4>{course.duration}</h4>

                  <div className="adc-actions-new">
                    <button
                      className="adc-edit-new"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>

                    <button
                      className="adc-delete-new"
                      onClick={() => handleDelete(course.id)}
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
            {modalType === "update"
              ? "Are you sure you want to update this course?"
              : "Are you sure you want to delete this course?"}
          </p>

          <div className="modal-footer-actions">
            <button
              className="modal-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button
              className={
                modalType === "update"
                  ? "modal-update-btn"
                  : "modal-delete-btn"
              }
              onClick={
                modalType === "update"
                  ? confirmUpdateCourse
                  : confirmDeleteCourse
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

export default AddCourse;