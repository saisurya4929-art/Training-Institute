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

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    if (!student?.id) {
      toast.error("Please login again");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/enrollments/student/${student.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("My courses error:", error);
      toast.error(error.response?.data || "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (enrollmentId, completedLessons, totalLessons) => {
    try {
      await axios.put(
        `http://localhost:8080/api/enrollments/progress/${enrollmentId}?completedLessons=${completedLessons}&totalLessons=${totalLessons}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Progress updated ✅");
      fetchMyCourses();
    } catch (error) {
      console.log("Progress update error:", error);
      toast.error(error.response?.data || "Failed to update progress");
    }
  };

  const handleCompleteLesson = (item) => {
    const completedLessons = item.completedLessons || 0;
    const totalLessons = item.totalLessons || 20;

    if (completedLessons >= totalLessons) {
      toast.info("Course already completed");
      return;
    }

    updateProgress(item.id, completedLessons + 1, totalLessons);
  };

  const downloadCertificate = async (enrollmentId, progress) => {
    if (progress < 100) {
      toast.warning("Complete course 100% to download certificate");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/certificates/download/${enrollmentId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Certificate downloaded ✅");
    } catch (error) {
      console.log("Certificate error:", error);
      toast.error("Certificate download failed");
    }
  };

  const openReviewModal = (item) => {
    setSelectedCourse(item);
    setRating(5);
    setReview("");
    setShowReviewModal(true);
  };

  const submitReview = async (e) => {
    e.preventDefault();

    const courseId = selectedCourse?.course?.id;

    if (!courseId) {
      toast.error("Course not found");
      return;
    }

    if (!review.trim()) {
      toast.warning("Please write your review");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/reviews/${student.id}/${courseId}`,
        {
          rating: rating,
          review: review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review submitted successfully ✅");
      setShowReviewModal(false);
      setSelectedCourse(null);
      setReview("");
      setRating(5);
    } catch (error) {
      console.log("Review error:", error);
      toast.error(error.response?.data || "Review submit failed");
    }
  };

  const getColorClass = (index) => {
    const colors = [
      "course-theme-blue",
      "course-theme-purple",
      "course-theme-pink",
      "course-theme-green",
    ];

    return colors[index % colors.length];
  };

  const getCourseIcon = (title) => {
    const text = title?.toLowerCase() || "";

    if (text.includes("java")) return "☕";
    if (text.includes("spring")) return "⚙️";
    if (text.includes("react")) return "⚛️";
    if (text.includes("mysql")) return "🗄️";
    if (text.includes("python")) return "🐍";
    if (text.includes("web")) return "🌐";

    return "💻";
  };

  const activeCourses = courses.filter(
    (item) => item.status?.toUpperCase() === "ENROLLED"
  ).length;

  const completedCourses = courses.filter(
    (item) => item.status?.toUpperCase() === "COMPLETED"
  ).length;

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((total, item) => total + (item.progress || 0), 0) /
            courses.length
        )
      : 0;

  return (
    <div className="student-page-wrapper">
      <Sidebar />

      <div className="student-page-content">
        <div className="student-course-main2">
          <div className="student-course-header2">
            <div>
              <h1 className="student-page-title">
                {student?.name || "Student"}'s Learning Space
              </h1>

              <p className="student-page-subtitle">
                View your enrolled courses, track progress, download
                certificates, and review completed courses.
              </p>
            </div>

            <div className="student-course-user2">
              <div className="student-course-user-avatar2">
                {(student?.name || "S").charAt(0).toUpperCase()}
              </div>

              <div>
                <h4>{student?.name || "Student"}</h4>
                <span>Course Explorer</span>
              </div>
            </div>
          </div>

          <div className="student-course-summary2">
            <div className="student-course-mini2">
              <h3>{courses.length}</h3>
              <p>Total Enrollments</p>
            </div>

            <div className="student-course-mini2">
              <h3>{activeCourses}</h3>
              <p>Active Courses</p>
            </div>

            <div className="student-course-mini2">
              <h3>{averageProgress}%</h3>
              <p>Average Progress</p>
            </div>

            <div className="student-course-mini2">
              <h3>{completedCourses}</h3>
              <p>Certificates Ready</p>
            </div>
          </div>

          {loading ? (
            <p className="no-courses-text">Loading your courses...</p>
          ) : courses.length === 0 ? (
            <p className="no-courses-text">
              You have not enrolled in any course yet.
            </p>
          ) : (
            <div className="student-course-grid2">
              {courses.map((item, index) => {
                const course = item.course || {};
                const progress = item.progress || 0;
                const completedLessons = item.completedLessons || 0;
                const totalLessons = item.totalLessons || 20;

                return (
                  <div
                    className={`student-course-card2 ${getColorClass(index)}`}
                    key={item.id}
                  >
                    <div className="student-course-top2">
                      <div className="student-course-icon2">
                        {getCourseIcon(course.title)}
                      </div>

                      <span className="student-course-status2">
                        {item.status || "ENROLLED"}
                      </span>
                    </div>

                    <h3>{course.title || "Course Title"}</h3>

                    <h5>
                      {course.description ||
                        "Course description not available"}
                    </h5>

                    <div className="student-course-info-grid2">
                      <div className="student-course-info-box2">
                        <small>Trainer</small>
                        <strong>Institute Mentor</strong>
                      </div>

                      <div className="student-course-info-box2">
                        <small>Duration</small>
                        <strong>{course.duration || "Not Added"}</strong>
                      </div>

                      <div className="student-course-info-box2">
                        <small>Lessons</small>
                        <strong>
                          {completedLessons} / {totalLessons}
                        </strong>
                      </div>

                      <div className="student-course-info-box2">
                        <small>Joined</small>
                        <strong>{item.enrolledDate || "Today"}</strong>
                      </div>
                    </div>

                    <div className="student-course-progress-head2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="student-course-progress2">
                      <div
                        className="student-course-progress-fill2"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div className="student-course-btn-row2">
                      <button
                        type="button"
                        className="student-course-primary2"
                        onClick={() => handleCompleteLesson(item)}
                      >
                        {progress >= 100 ? "Completed" : "Complete Lesson"}
                      </button>

                      <button
                        type="button"
                        className="student-course-secondary2"
                        onClick={() => downloadCertificate(item.id, progress)}
                      >
                        Certificate
                      </button>

                      <button
                        type="button"
                        className="student-course-secondary2"
                        onClick={() => openReviewModal(item)}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showReviewModal && (
        <div className="review-modal-overlay">
          <div className="review-modal-box">
            <button
              type="button"
              className="review-modal-close"
              onClick={() => setShowReviewModal(false)}
            >
              ×
            </button>

            <h2>Rate This Course</h2>

            <p className="review-course-name">
              {selectedCourse?.course?.title || "Course"}
            </p>

            <form onSubmit={submitReview}>
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={star <= rating ? "star active" : "star"}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                className="review-textarea"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              <button type="submit" className="review-submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;