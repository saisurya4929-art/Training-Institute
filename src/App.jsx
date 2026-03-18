import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./Pages/About";
import Courses from "./Pages/Courses";
import Register from "./Pages/Register";
import Placements from "./Pages/Palcement";
import Blog from "./Pages/Blog";
import Gallery from "./components/Gallery";
import AdminLogin from "./Pages/Adminlogin";
import StudentLogin from "./Pages/Studentlogin";
import Dashboard from "./Pages/Dashboard";
function App() {
return (
  



       <>
       <BrowserRouter>
    <Routes>

<Route path="/Home" element={<Home/>} />

<Route path="/about" element={<About/>} />

<Route path="/courses" element={<Courses/>} />

<Route path="/register" element={<Register/>} />

<Route path="/placement" element={<Placements/>}/>

<Route path="/blog" element={<Blog/>} />

<Route path="/gallery" element={<Gallery/>} />

<Route path="/" element={<StudentLogin/>}/>

<Route path="/admin" element={<AdminLogin/>}/>

<Route path="/dashboard" element={<Dashboard/>} />

</Routes>
</BrowserRouter>
    </>
  );
}


export default App


