import React from "react";
import "../styles/Skeleton.css";
import "../styles/CourseSkeleton.css";

const CourseSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div className="modern-course-card course-skeleton-card" key={index}>
          <div className="skeleton-shimmer course-skeleton-image"></div>

          <div className="modern-course-content">
            <div className="skeleton-shimmer course-skeleton-title"></div>
            <div className="skeleton-shimmer course-skeleton-line"></div>
            <div className="skeleton-shimmer course-skeleton-line short"></div>
            <div className="skeleton-shimmer course-skeleton-duration"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseSkeleton;