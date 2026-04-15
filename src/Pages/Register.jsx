import React, { useState } from "react";
import "../Styles/Register.css";
import axios from "axios";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    courses: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );

      console.log(response.data);
      alert("Registration Successful!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Error saving data");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Example Pass Sai@1234"
            onChange={handleChange}
            required
          />
          <select
            name="courses"
            onChange={handleChange}
          >
            <option value="">Select Courses</option>
            <option value="Java">Java Full Stack</option>
            <option value="Python">Python Full Stack</option>
            <option value="Mern">MERN Full Stack</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;