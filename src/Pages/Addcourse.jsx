import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Addcourse.css"

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        imageUrl: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/courses", formData);
            setMessage("Course added successfully ✅");

            setFormData({
                title: "",
                description: "",
                duration: "",
                imageUrl: "",
            });
        } catch (error) {
            console.error(error);
            setMessage("Failed to add course ❌");
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

                    {message && <p className="course-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddCourse;