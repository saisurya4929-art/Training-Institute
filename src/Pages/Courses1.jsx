import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/StudentCommon.css";
import "../Styles/MyCourses.css";

const MyCourses = () => {
  const student = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/enrollments/student/${student.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-page-wrapper">
      <Sidebar />

      <div className="student-page-content">
        <div className="student-course-main2">
          <h1 className="student-page-title">
            {student?.name}'s Learning Space
          </h1>

          {loading ? (
            <p className="no-courses-text">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="no-courses-text">No enrolled courses found</p>
          ) : (
            <div className="student-course-grid2">
              {courses.map((item) => (
                <div className="student-course-card2 course-theme-blue" key={item.id}>
                  <div className="student-course-top2">
                    <div className="student-course-icon2">💻</div>

                    <span className="student-course-status2">
                      {item.status}
                    </span>
                  </div>

                  <h3>{item.course?.title}</h3>

                  <h5>{item.course?.description}</h5>

                  <div className="student-course-info-grid2">
                    <div className="student-course-info-box2">
                      <small>Duration</small>
                      <strong>{item.course?.duration}</strong>
                    </div>

                    <div className="student-course-info-box2">
                      <small>Joined</small>
                      <strong>{item.enrolledDate}</strong>
                    </div>
                  </div>

                  <div className="student-course-btn-row2">
                    <button className="student-course-primary2">
                      Continue
                    </button>

                    <button className="student-course-secondary2">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;