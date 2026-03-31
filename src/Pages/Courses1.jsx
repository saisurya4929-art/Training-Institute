import Sidebar from "../components/Sidebar";

function Courses1() {

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">
        <Navbar />

        <h2>My Courses</h2>
        <ul>
          <li>Java Full Stack</li>
          <li>React Development</li>
        </ul>

      </div>

    </div>
  );
}

export default Courses1;