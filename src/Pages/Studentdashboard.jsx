import '../Styles/Studentdashboard.css';
import React from "react";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";


const data = [
  { name: "Jan", progress: 20 },
  { name: "Feb", progress: 40 },
  { name: "Mar", progress: 30 },
  { name: "Apr", progress: 50 },
  { name: "May", progress: 45 }
];

const hours = [
  { day: "Mon", hrs: 2 },
  { day: "Tue", hrs: 3 },
  { day: "Wed", hrs: 4 },
  { day: "Thu", hrs: 2 },
  { day: "Fri", hrs: 5 }
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">

        <div className="cards">
          <div className="card">6 Enrolled</div>
          <div className="card">3 Completed</div>
          <div className="card">2 Ongoing</div>
          <div className="card">5 Certificates</div>
        </div>

        <div className="charts">

          <div className="chart-box">
            <h3>Course Progress</h3>
            <LineChart width={400} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#6366f1" />
            </LineChart>
          </div>

          <div className="chart-box">
            <h3>Weekly Study</h3>
            <BarChart width={400} height={250} data={hours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hrs" fill="#4f46e5" />
            </BarChart>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;