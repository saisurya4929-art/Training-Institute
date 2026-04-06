
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./Pages/About";
import Courses from "./Pages/Courses";
import Register from "./Pages/Register";
import Placements from "./Pages/Palcement";
import Blog from "./Pages/Blog";
import Gallery from "./components/Gallery";
import Login from "./Pages/Login";

import StudentDashboard from "./Pages/Studentdashboard";
import Upload from "./Pages/Upload";
import Profile from "./Pages/Profile";
import MyCourses from "./Pages/Courses1";
import AdminDashboard from "./Pages/Admindash";
import AddPlacement from "./Pages/Addplacement";
import AddCourse from "./Pages/Addcourse";
import AdminGallery from "./Pages/Addgallery";
import AddBlog from "./Pages/Addblog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/placement" element={<Placements />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/add-course" element={<AddCourse/>} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/blog" element={<AddBlog/>} />
        <Route path="/admin/placement" element={<AddPlacement/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;