// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../Styles/Sidebar.css";
// import Modal from "../components/Modal";
// import ThemeToggle from "../components/ThemeToggle";

// const StudentSidebar = () => {
//   const navigate = useNavigate();
//   const student = JSON.parse(localStorage.getItem("user"));
//   const [openLogout, setOpenLogout] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <>
//       <aside className="sd-sidebar">
//         <div className="sd-sidebar-top">
//           <div className="sd-sidebar-brand">
//             <div className="sd-sidebar-brand-icon">🎓</div>
//             <div>
//               <h2>Training</h2>
//               <p>Institute</p>
//             </div>
//           </div>

//           <div className="sd-sidebar-userbox">
//             <div className="sd-sidebar-user-avatar">
//               {(student?.name || "S").charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <h4>{student?.name || "Student"}</h4>
//               <span>Keep growing every day 🚀</span>
//             </div>
//           </div>

//           <nav className="sd-sidebar-menu">
//             <NavLink to="/studentdashboard">Dashboard</NavLink>
//             <NavLink to="/mycourses">My Courses</NavLink>
//             <NavLink to="/upload">Upload Documents</NavLink>
//             <NavLink to="/profile">Profile</NavLink>
//           </nav>
//         </div>

//         <div className="sd-sidebar-bottom">
//           <ThemeToggle />

//           <button
//             className="sd-sidebar-logout"
//             onClick={() => setOpenLogout(true)}
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       <Modal
//         isOpen={openLogout}
//         onClose={() => setOpenLogout(false)}
//         title="Confirm Logout"
//         footer={
//           <>
//             <button
//               className="modal-btn modal-btn-cancel"
//               onClick={() => setOpenLogout(false)}
//             >
//               Cancel
//             </button>
//             <button className="modal-btn modal-btn-danger" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         }
//       >
//         <p>Are you sure you want to logout from your student account?</p>
//       </Modal>
//     </>
//   );
// };

// export default StudentSidebar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";
import Modal from "../components/Modal";
import ThemeToggle from "../components/ThemeToggle";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("user"));
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <aside className="sd-sidebar">
        <div className="sd-sidebar-top">
          <div className="sd-sidebar-brand">
            <div className="sd-sidebar-brand-icon">🎓</div>
            <div>
              <h2>Training</h2>
              <p>Institute</p>
            </div>
          </div>

          <div className="sd-sidebar-userbox">
            <div className="sd-sidebar-user-avatar">
              {(student?.name || "S").charAt(0).toUpperCase()}
            </div>
            <div>
              <h4>{student?.name || "Student"}</h4>
              <span>Keep growing every day 🚀</span>
            </div>
          </div>

          <nav className="sd-sidebar-menu">
            <NavLink to="/studentdashboard">Dashboard</NavLink>
            <NavLink to="/mycourses">My Courses</NavLink>
            <NavLink to="/upload">Upload Documents</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
        </div>

        <div className="sd-sidebar-bottom">
          <ThemeToggle />
          <button
            className="sd-sidebar-logout"
            onClick={() => setOpenLogout(true)}
          >
            Logout
          </button>
        </div>
      </aside>

      <Modal
        isOpen={openLogout}
        onClose={() => setOpenLogout(false)}
        title="Confirm Logout"
        footer={
          <>
            <button
              className="modal-btn modal-btn-cancel"
              onClick={() => setOpenLogout(false)}
            >
              Cancel
            </button>
            <button className="modal-btn modal-btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        }
      >
        <p>Are you sure you want to logout from your student account?</p>
      </Modal>
    </>
  );
};

export default StudentSidebar;