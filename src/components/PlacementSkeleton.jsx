import React from "react";
import "../Styles/Skeleton.css";
import "../Styles/PlacementSkeleton.css";

const PlacementSkeleton = () => {
  return (
    <>
      <div className="students-grid">
        {[...Array(6)].map((_, index) => (
          <div className="student-card placement-skeleton-card" key={index}>
            <div className="skeleton-shimmer placement-skeleton-img"></div>
            <div className="skeleton-shimmer placement-skeleton-title"></div>
            <div className="skeleton-shimmer placement-skeleton-text"></div>
            <div className="skeleton-shimmer placement-skeleton-badge"></div>
          </div>
        ))}
      </div>

      <div className="placement-table-skeleton">
        {[...Array(5)].map((_, row) => (
          <div className="placement-table-skeleton-row" key={row}>
            <div className="skeleton-shimmer placement-table-cell"></div>
            <div className="skeleton-shimmer placement-table-cell"></div>
            <div className="skeleton-shimmer placement-table-cell"></div>
            <div className="skeleton-shimmer placement-table-cell"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlacementSkeleton;