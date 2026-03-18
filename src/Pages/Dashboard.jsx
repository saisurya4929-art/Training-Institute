import Sidebar from "../components/Sidebar";
import "../Styles/Dashboard.css";
import { FaBell } from "react-icons/fa";

function Dashboard(){

return(

<div className="dashboard">

<Sidebar/>

<div className="main-content">

{/* TOPBAR */}
<div className="topbar">

<h2>Student Dashboard</h2>

<div className="top-actions">
<FaBell className="icon"/>

<div className="profile">
<span>Surya</span>
</div>
</div>

</div>


<div className="welcome-box">
<h1>Welcome Surya 👋</h1>
<p>Track your progress and manage your learning</p>
</div>


<div className="stats">

<div className="stat-card">
<h3>Courses</h3>
<p>4</p>
</div>

<div className="stat-card">
<h3>Completed</h3>
<p>2</p>
</div>

<div className="stat-card">
<h3>Documents</h3>
<p>1</p>
</div>

</div>


<h2 className="title">My Courses</h2>

<div className="courses">

<div className="course-card">
<h3>Java Full Stack</h3>
<div className="progress-bar">
<div className="progress" style={{width:"75%"}}></div>
</div>
</div>

<div className="course-card">
<h3>React JS</h3>
<div className="progress-bar">
<div className="progress" style={{width:"50%"}}></div>
</div>
</div>

</div>


<h2 className="title">Upload Documents</h2>

<div className="upload">

<input type="file"/>
<button>Upload</button>

</div>

</div>

</div>

)

}

export default Dashboard;