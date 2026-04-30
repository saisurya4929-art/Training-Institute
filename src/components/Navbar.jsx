import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/logoimg2.jpeg";

function Navbar() {
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 80) {
        setShowNavbar(true);
      } else if (currentScroll > lastScroll) {
        setShowNavbar(false);
        setOpenMenu(false);
        setOpenProfile(false);
      } else {
        setShowNavbar(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setOpenProfile(false);
    navigate("/login");
  };

  const goDashboard = () => {
    setOpenProfile(false);
    navigate(user?.role === "ADMIN" ? "/admin" : "/studentdashboard");
  };

  return (
    <div className={`navbar ${showNavbar ? "navbar-show" : "navbar-hide"}`}>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>

      <button
        className={`menu-toggle ${openMenu ? "menu-active" : ""}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${openMenu ? "nav-open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
        </li>
        <li>
          <Link to="/courses" onClick={closeMenu}>Courses</Link>
        </li>
        <li>
          <Link to="/placement" onClick={closeMenu}>Placement</Link>
        </li>
        <li>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
        </li>

        <li className="mobile-btn-item">
          <button
            className="gallery-btn"
            onClick={() => {
              navigate("/gallery");
              closeMenu();
            }}
          >
            Gallery
          </button>
        </li>

        {!user && (
          <li className="mobile-btn-item">
            <button
              className="log-btn"
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
            >
              Login
            </button>
          </li>
        )}
      </ul>

      <div className="nav-actions">
        <button className="gallery-btn" onClick={() => navigate("/gallery")}>
          Gallery
        </button>

        {!user ? (
          <button className="log-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div className="user-menu">
            <div
              className="user-avatar"
              onClick={() => setOpenProfile(!openProfile)}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {openProfile && (
              <div className="premium-dropdown">
                <div className="profile-cover"></div>

                <div className="profile-main-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <h3>{user.name}</h3>
                <p className="profile-email">{user.email}</p>

                <span className="profile-role">
                  {user.role || "STUDENT"}
                </span>

                <button className="profile-dashboard-btn" onClick={goDashboard}>
                  Go to Dashboard
                </button>

                <button className="profile-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;