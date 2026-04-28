import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./Pages/About";
import Courses from "./Pages/Courses";
import Register from "./Pages/Register";
import Placements from "./Pages/Placement";
import Blog from "./Pages/Blog";
import Gallery from "./components/Gallery";
import Login from "./Pages/Login";
import Forgotpassword from "./Pages/Forgotpassword";
import ResetPassword from "./Pages/ResetPassword";
import Upload from "./Pages/Upload";
import Profile from "./Pages/Profile";
import MyCourses from "./Pages/Courses1";
import AdminDashboard from "./Pages/Admindash";
import AddPlacement from "./Pages/Addplacement";
import AddCourse from "./Pages/Addcourse";
import AdminGallery from "./Pages/Addgallery";
import AddBlog from "./Pages/Addblog";
import StudentDashboard from "./Pages/Studentdashboard";
import SessionManager from "./utils/SessionManager";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <SessionManager />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/placement" element={<Placements />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/Studentdashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mycourses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/add-course"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AddCourse />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AdminGallery />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/blog"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AddBlog />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/placement"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AddPlacement />
            </RoleProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
