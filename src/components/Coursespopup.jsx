import React from "react";
import "../styles/Courses.css";

const CoursePopup = ({closePopup}) => {

return(

<div className="popup-overlay">

<div className="popup">

<h2>Available Courses</h2>

<ul>

<li>Java Full Stack Development</li>
<li>Spring Boot Backend</li>
<li>Python Full Stack Development</li>
<li>Frontend Development</li>
<li>React JS Development</li>
<li>Python Data Science</li>
<li>DevOps & Cloud Computing</li>
<li>UI / UX Design</li>

</ul>

<button className="close-btn" onClick={closePopup}>
X
</button>

</div>

</div>

)

}

export default CoursePopup;