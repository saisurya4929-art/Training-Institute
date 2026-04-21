import React from "react";
import "../Styles/Skeleton.css";
import "../Styles/GallerySkeleton.css";

const GallerySkeleton = () => {
  return (
    <div className="gallery-grid">
      {[...Array(8)].map((_, index) => (
        <div className="gallery-card gallery-skeleton-card" key={index}>
          <div className="skeleton-shimmer gallery-skeleton-image"></div>
          <div className="gallery-skeleton-overlay">
            <div className="skeleton-shimmer gallery-skeleton-title"></div>
            <div className="skeleton-shimmer gallery-skeleton-text"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton;