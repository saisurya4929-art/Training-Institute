import React, { useState } from "react";
import axios from "axios";
import "../Styles/AddPlacement.css";
import AdminSidebar from "./Adminsidebar";

const AddPlacement = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        company: "",
        role: "",
        packageAmount: "",
        imageUrl: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/placements", formData);
            setMessage("Placement added successfully ✅");

            setFormData({
                studentName: "",
                company: "",
                role: "",
                packageAmount: "",
                imageUrl: "",
            });
        } catch (error) {
            console.error(error);
            setMessage("Failed to add placement ❌");
        }
    };

    return (
        <div className="admin-layout-page">
           <AdminSidebar/>
        
        <div className="add-placement-page">
            <div className="add-placement-card">
                <h2>Add Placement</h2>
                <p>Admin can add student placement details here</p>

                <form onSubmit={handleSubmit} className="placement-form">
                    <input
                        type="text"
                        name="studentName"
                        placeholder="Student Name"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Job Role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="packageAmount"
                        placeholder="Package (Example: 6 LPA)"
                        value={formData.packageAmount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Student Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Placement</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
        </div>

    );
};

export default AddPlacement;
