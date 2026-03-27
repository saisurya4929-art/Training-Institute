import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">
        <Navbar />

        <h2>My Profile</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>

      </div>

    </div>
  );
}

export default Profile;