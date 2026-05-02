import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Courses.css";
import CourseSkeleton from "../components/CourseSkeleton";
import ErrorBoundary from "../components/ErrorBoundary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CACHE_KEY = "coursesCache";
const CACHE_TIME = 5 * 60 * 1000;

const saveCache = (data) => {
  sessionStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data,
      expiry: Date.now() + CACHE_TIME,
    })
  );
};

const getCache = () => {
  const cached = sessionStorage.getItem(CACHE_KEY);

  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);

    if (Date.now() > parsed.expiry) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed.data;
  } catch (error) {
    sessionStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchAllReviews();
  }, []);

  const fetchCourses = async () => {
    const cachedCourses = getCache();

    if (cachedCourses) {
      setCourses(cachedCourses);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/api/courses");

      setCourses(res.data);
      saveCache(res.data);
    } catch (err) {
      console.log("Error fetching courses:", err);
      setError("Failed to load courses.");
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reviews/all");
      setAllReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Review fetch error:", err);
      setAllReviews([]);
    }
  };

  const handleRefreshCourses = async () => {
    sessionStorage.removeItem(CACHE_KEY);
    setLoading(true);
    setError("");
    await fetchCourses();
    await fetchAllReviews();
    toast.success("Courses refreshed");
  };

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      toast.warning("Please login first to enroll");
      setTimeout(() => {
        navigate("/Login");
      }, 1200);
      return;
    }

    if (user.role?.toUpperCase() !== "STUDENT") {
      toast.error("Only students can enroll courses");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/enrollments/${user.id}/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data);
    } catch (error) {
      console.log("Enrollment error:", error);
      toast.error(error.response?.data || "Enrollment failed");
    }
  };

  const renderStars = (rating) => {
    const value = Math.round(Number(rating || 0));
    return "★".repeat(value) + "☆".repeat(5 - value);
  };

  const filteredCourses = courses.filter((course) => {
    const title = course.title || "";
    const description = course.description || "";
    const duration = course.duration || "";

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duration.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="courses-container">
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />

        <div className="logo1-header">
          <div className="logo1">Globel Skills Academy</div>

          <div className="header-buttons">
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>

        <section className="modern-courses-section">
          <h2 className="modern-course-title">Our Popular Courses</h2>

          <div className="modern-course-grid">
            <CourseSkeleton />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="courses-container">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="logo1-header">
        <div className="logo1">Globel Skills Academy</div>

        <div className="header-buttons">
          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>
      </div>

      <section className="hero-tn">
        <div className="hero-overlay">
          <h1>Build Your Career in IT Industry</h1>

          <p>
            Join our industry oriented training programs designed by experienced
            developers and mentors. Learn practical development skills and work
            on real-world projects.
          </p>

          <div className="hero-cards">
            <div className="card">
              <h3>Industry Experts</h3>
              <p>Learn from professionals working in top IT companies.</p>
            </div>

            <div className="card">
              <h3>Live Projects</h3>
              <p>Work on real applications like company projects.</p>
            </div>

            <div className="card">
              <h3>Placement Support</h3>
              <p>Resume preparation, mock interviews and job referrals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-courses-section">
        <h2 className="modern-course-title">Our Popular Courses</h2>

        <p className="modern-course-subtitle">
          Choose the right course and become job ready with practical training,
          live projects and placement support.
        </p>

        <input
          type="text"
          placeholder="Search courses by name, duration or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="course-search-input"
        />

        {error && <p className="no-courses-text">{error}</p>}

        <ErrorBoundary>
          <div className="modern-course-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div className="modern-course-card" key={course.id}>
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="modern-course-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250";
                    }}
                  />

                  <div className="modern-course-content">
                    <h3>{course.title}</h3>

                    <p>{course.description}</p>

                    <span>Duration: {course.duration}</span>

                    <button
                      className="enroll-btn"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-courses-text">No matching courses found</p>
            )}
          </div>
        </ErrorBoundary>
      </section>

      <section className="course-details">
        <h2>Why Choose Our Institute</h2>

        <p>
          Our training programs are designed to make students industry ready. We
          provide practical coding sessions, project development, and technical
          interview preparation.
        </p>

        <div className="details-grid">
          <div>
            <h4>Course Duration</h4>
            <p>3 to 6 Months</p>
          </div>

          <div>
            <h4>Training Mode</h4>
            <p>Online / Offline</p>
          </div>

          <div>
            <h4>Certification</h4>
            <p>Industry Recognized Certificate</p>
          </div>

          <div>
            <h4>Internship</h4>
            <p>Real project experience</p>
          </div>
        </div>
      </section>

      <section className="student-review-section">
        <div className="student-review-header">
          <span>Student Feedback</span>
          <h2>What Our Students Say</h2>
          <p>
            Real feedback from students who enrolled and completed our training
            programs.
          </p>
        </div>

        <div className="student-review-grid">
          {allReviews.length > 0 ? (
            allReviews.map((review) => (
              <div className="student-review-card" key={review.id}>
                <div className="student-review-top">
                  <div className="student-review-avatar">
                    {(review.student?.name || "S").charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4>{review.student?.name || "Student"}</h4>
                    <small>{review.course?.title || "Course"}</small>
                  </div>
                </div>

                <div className="student-review-stars">
                  {renderStars(review.rating)}
                </div>

                <p>{review.review}</p>
              </div>
            ))
          ) : (
            <p className="no-review-text">No student reviews yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;