import React, { useState } from "react";
import '../Styles/Register.css';

const StudentRegister = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Registration Successful!");
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2 className="register-title">Student Registration</h2>

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
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />

          <select
            name="course"
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="Java Full Stack">Java Full Stack</option>
            <option value="Python Full Stack">Python Full Stack</option>
            <option value="Springboot Backend">Springboot Backend</option>
          </select>

          <button type="submit">Register</button>

        </form>

      </div>

    </div>
  );
};

export default StudentRegister;