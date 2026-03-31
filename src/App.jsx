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
import ProtectedRoute from "./Routes/Productroute";
import StudentDashboard from "./Pages/Studentdashboard";
import Profile from "./Pages/Profile";
import Courses1 from "./Pages/Courses1";
import Upload from "./Pages/Upload";
function App() {
return (
  



       <>
       <BrowserRouter>
    <Routes>
{/* <Route path="/" element={<Login/>}/> */}

<Route path="/" element={<Home/>} />

<Route path="/about" element={<About/>} />

<Route path="/courses" element={<Courses/>} />

<Route path="/register" element={<Register/>} />

<Route path="/placement" element={<Placements/>}/>

<Route path="/blog" element={<Blog/>} />

<Route path="/gallery" element={<Gallery/>} />





<Route path="/studentdashboard" element={<StudentDashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/courses1" element={<Courses1 />} />

        <Route path="/upload" element={<Upload />} />
</Routes>
</BrowserRouter>
    </>
  );
}


export default App;
