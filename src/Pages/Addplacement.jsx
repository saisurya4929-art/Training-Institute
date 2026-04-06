import React, { useState } from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Addplacement.css";
// import "../Styles/AddPlacement.css";

const AddPlacement = () => {
    const [placement, setPlacement] = useState({
        studentName: "",
        company: "",
        packageValue: "",
        role: ""
    });

    const handleChange = (e) => {
        setPlacement({ ...placement, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(placement);
        alert("Placement Added Successfully");
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <div className="placement-content">
                <div className="placement-card">
                    <h2>Add Placement Record</h2>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="studentName" placeholder="Student Name" onChange={handleChange} />
                        <input type="text" name="company" placeholder="Company Name" onChange={handleChange} />
                        <input type="text" name="packageValue" placeholder="Salary Package" onChange={handleChange} />
                        <input type="text" name="role" placeholder="Job Role" onChange={handleChange} />

                        <button type="submit">Add Placement</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPlacement;