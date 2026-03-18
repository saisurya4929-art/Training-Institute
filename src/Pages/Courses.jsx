import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Courses.css";
import CoursePopup from "../components/Coursespopup.jsx";

const Courses = () => {

const [popup,setPopup] = useState(false);
const navigate = useNavigate();
return (

<div className="courses-container">

<header className="header">

<div className="logo">
Nextgen Institute
</div>

<div className="header-buttons">

<button className="course-btn" onClick={()=>setPopup(true)}>
View Courses
</button>


  <button className="register-btn" onClick={()=>navigate("/register")} >Register</button>

</div>

</header>


<section className="hero">

<h1>Build Your Career in IT Industry</h1>
{/* 
<p>
Join our industry oriented training programs designed by experienced
developers and mentors. Learn practical development skills and work
on real-world projects.
</p> */}

<div className="hero-cards">

<div className="card">
<h3>Industry Experts</h3>
<p>Learn from professionals working in top IT companies.</p>
</div>

<div className="card">
<h3>Live Projects</h3>
<p>Work on real applications like company projects.</p>
</div>

<div className="card">
<h3>Placement Support</h3>
<p>Resume preparation, mock interviews and job referrals.</p>
</div>

</div>

</section>


<section className="course-details">

<h2>Why Choose Our Institute</h2>

<p>
Our training programs are designed to make students industry ready.
We provide practical coding sessions, project development, and
technical interview preparation.
</p>

<div className="details-grid">

<div>
<h4>Course Duration</h4>
<p>3 to 6 Months</p>
</div>

<div>
<h4>Training Mode</h4>
<p>Online / Offline</p>
</div>

<div>
<h4>Certification</h4>
<p>Industry Recognized Certificate</p>
</div>

<div>
<h4>Internship</h4>
<p>Real project experience</p>
</div>

</div>

</section>


{popup && <CoursePopup closePopup={()=>setPopup(false)}/>}

</div>

);
};

export default Courses;