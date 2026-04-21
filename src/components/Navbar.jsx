import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/logoimg2.jpeg";

function Navbar() {

  const navigate = useNavigate();
  
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/placement">Placement</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
      <button
        className="gallery-btn"
        onClick={() => navigate("/gallery")}
      >
        Gallery
      </button>
      <button
        className="log-btn"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}

export default Navbar;