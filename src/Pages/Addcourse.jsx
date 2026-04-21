import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Addcourse.css";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const toastId = toast.loading("Adding course...");

    try {
      await axios.post("http://localhost:8080/api/courses", formData);

      toast.update(toastId, {
        render: "Course added successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setFormData({
        title: "",
        description: "",
        duration: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Failed to add course ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="admin-course-layout">
      <AdminSidebar />

      <div className="add-course-page">
        <div className="add-course-header">
          <h1>Add New Course 📘</h1>
          <p>Create course content for your website</p>
        </div>

        <div className="add-course-card">
          <form onSubmit={handleSubmit} className="add-course-form">
            <div className="course-field">
              <label>Course Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="course-field">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="Example: 6 Months"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="course-field">
              <label>Image URL</label>
              <input
                type="text"
                name="imageUrl"
                placeholder="Enter course image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="course-field">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button type="submit" className="course-submit-btn">
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;