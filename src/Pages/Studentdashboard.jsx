
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../Styles/Studentdashboard.css';

function StudentDashboard() {

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="cards">
          <div className="card">My Courses: 3</div>
          <div className="card">Completed: 1</div>
          <div className="card">Pending: 2</div>
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;