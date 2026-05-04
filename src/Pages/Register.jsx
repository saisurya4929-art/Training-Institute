import React, { useState } from "react";
import "../Styles/Register.css";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import instituteImg from "../assets/reg.jpeg";

const StudentRegister = () => {
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      !studentForm.name.trim() ||
      !studentForm.email.trim() ||
      !studentForm.password.trim()
    ) {
      toast.warning("Please fill all fields ⚠️");
      return;
    }

    const loadingToast = toast.loading("Registering...");

    try {
      setLoading(true);

      const response = await axiosInstance.post("/api/register", studentForm);

      console.log("Register response:", response.data);

      toast.update(loadingToast, {
        render: "Registration Successful! ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setStudentForm({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
      });
    } catch (error) {
      console.error("Register error:", error);

      toast.update(loadingToast, {
        render:
          error.response?.data?.message ||
          error.response?.data ||
          "Error saving data ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-page-shell">
      <div className="admission-main-card">
        <div className="admission-visual-side">
          <img
            src={instituteImg}
            alt="training institute"
            className="admission-side-image"
          />

          <div className="admission-image-shade"></div>

          <div className="admission-image-content">
            <h2>Create Account</h2>
            <p>
              Join our training institute and start building practical skills
              with expert guidance, real projects, and career-focused learning.
            </p>
          </div>
        </div>

        <div className="admission-form-side">
          <div className="admission-form-wrap">
            <h1>Sign Up</h1>

            <form
              onSubmit={handleRegisterSubmit}
              className="admission-form-grid"
            >
              <div className="admission-field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={studentForm.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="admission-field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={studentForm.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="admission-field-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Example: Sai@1234"
                  value={studentForm.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="admission-submit-btn"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Now 🚀"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;