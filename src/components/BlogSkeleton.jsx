import React from "react";
import "../Styles/Skeleton.css";
import "../Styles/BlogSkeleton.css";

const BlogSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div className="blog-card blog-skeleton-card" key={index}>
          <div className="skeleton-shimmer blog-skeleton-image"></div>
          <div className="skeleton-shimmer blog-skeleton-title"></div>
          <div className="skeleton-shimmer blog-skeleton-text"></div>
          <div className="skeleton-shimmer blog-skeleton-text short"></div>
          <div className="skeleton-shimmer blog-skeleton-category"></div>
          <div className="skeleton-shimmer blog-skeleton-button"></div>
        </div>
      ))}
    </>
  );
};

export default BlogSkeleton;