import React from "react";
import { useNavigate } from "react-router-dom";
import "./Moviecard.css";


const Moviecard = ({ title, year, image, description, genres, duration, category ,driveId,bannerImage,trailerId}) => {
  const navigate = useNavigate();
  // Function to navigate to details page
 
  const handleClick = () => {
    navigate(`/movies/${title.replace(/\s+/g, "-").toLowerCase()}`, {
      state: { title, year, image, description, genres,category, duration,driveId,bannerImage,trailerId},
    });
  };

  return (
    <div className="movie-card"  onClick={handleClick}>
      <img src={image} alt={title} 
      className="movie-image"  layoutId={`poster-${title}`}/>
  
      <div className="overlay"></div>
      <div className="movie-info">
        <p className="movie-date">{year}</p>
        <h3 className="movie-title">{title}</h3>
      </div>
    </div>
  );
};

export default Moviecard;
