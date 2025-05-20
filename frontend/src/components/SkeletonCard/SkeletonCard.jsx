// SkeletonCard.jsx
import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
