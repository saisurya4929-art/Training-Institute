import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SessionManager from "./utils/SessionManager";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./Pages/About"));
const Courses = lazy(() => import("./Pages/Courses"));
const Register = lazy(() => import("./Pages/Register"));
const Placements = lazy(() => import("./Pages/Placement"));
const Blog = lazy(() => import("./Pages/Blog"));
const Gallery = lazy(() => import("./components/Gallery"));
const Login = lazy(() => import("./Pages/Login"));
const Forgotpassword = lazy(() => import("./Pages/Forgotpassword"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));

const StudentDashboard = lazy(() => import("./Pages/Studentdashboard"));
const MyCourses = lazy(() => import("./Pages/Courses1"));
const Upload = lazy(() => import("./Pages/Upload"));
const Profile = lazy(() => import("./Pages/Profile"));

const AdminDashboard = lazy(() => import("./Pages/Admindash"));
const AddPlacement = lazy(() => import("./Pages/Addplacement"));
const AddCourse = lazy(() => import("./Pages/Addcourse"));
const AdminGallery = lazy(() => import("./Pages/Addgallery"));
const AddBlog = lazy(() => import("./Pages/Addblog"));


const Loader = () => (
  <div style={loaderStyle}>
    <div className="spinner"></div>
    <p>Loading page...</p>
  </div>
);

const loaderStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: "600",
};

function App() {
  return (
    <BrowserRouter>
      <SessionManager />

      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<Register />} />
          <Route path="/placement" element={<Placements />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* STUDENT PROTECTED */}
          <Route
            path="/studentdashboard"
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
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;