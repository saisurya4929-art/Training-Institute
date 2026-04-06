import React, { useState } from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Addcourse.css"
const AddCourse = () => {
    const [course, setCourse] = useState({
        title: "",
        instructor: "",
        duration: "",
        fees: "",
        description: ""
    });

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(course);
        alert("Course Added Successfully");
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className="form-page-content">
                <div className="form-card">
                    <h2>Add New Course</h2>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" placeholder="Course Title" onChange={handleChange} />
                        <input type="text" name="instructor" placeholder="Instructor Name" onChange={handleChange} />
                        <input type="text" name="duration" placeholder="Duration" onChange={handleChange} />
                        <input type="text" name="fees" placeholder="Course Fees" onChange={handleChange} />
                        <textarea name="description" placeholder="Course Description" rows="5" onChange={handleChange}></textarea>

                        <button type="submit">Add Course</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;