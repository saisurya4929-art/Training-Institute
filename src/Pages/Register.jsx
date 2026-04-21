import React, { useState } from "react";
import "../Styles/Register.css";
import axios from "axios";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    courses: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.courses
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    const toastId = toast.loading("Registering...");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );

      console.log(response.data);

      toast.update(toastId, {
        render: "Registration Successful! ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        courses: "",
      });
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: error.response?.data || "Error saving data ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Example Pass Sai@1234"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="courses"
            value={formData.courses}
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