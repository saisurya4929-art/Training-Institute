import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      <h2>Student</h2>

      <ul>
        <Link to="/student"><li>Dashboard</li></Link>
        <Link to="/profile"><li>Profile</li></Link>
        <Link to="/courses"><li>Courses</li></Link>
        <Link to="/upload"><li>Upload</li></Link>
        <li onClick={logout}>Logout</li>
      </ul>

    </div>
  );
}

export default Sidebar;
