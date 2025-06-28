import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MovieDetailes.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Moviecard from "../Moviescard/Moviecard";
const MovieDetailes = () => {
  const location = useLocation();
  const {
    title,
    year,
    image,
    bannerImage,
    description,
    genres,
    category,
    duration,
    driveId,
  } = location.state || {};
  const qualityOptions = ["480p", "720p", "1080p", "4K"];

  // related movies suggestions
  const [relatedMovies, setRelatedMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/public/listAllPicture`)
      .then((res) => {
        const related = res.data.data
          .filter(
            (movie) =>
              movie.category.toLowerCase() === category.toLowerCase() &&
              movie.title !== title
          )
          .sort(() => 0.5 - Math.random())
          .slice(0, 7);

        setRelatedMovies(related);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [category, title]);

  if (!title) {
    return (
      <>
        <Navbar />
        <h2>Movie Not Found</h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="movie-details-page-wrapper">
         <div className="movie-details-hero">
  <img src={bannerImage||image} alt={title} className="movie-details-hero-img" />
  <div className="movie-details-hero-overlay">
    <h1>{title}</h1>
    <p>{year} • {duration}</p>
  </div>
</div>
{/* details-content */}
<div class="movie-details-content">
  <div class="movie-description">
    <p>{description}</p>
  </div>
        <div className="download-section">
          <h2>Download Links</h2>
          <div className="download-buttons">
            {qualityOptions.map((quality, index) => (
              <div key={index} className="download-option">
                <a
                  href={`https://drive.google.com/uc?export=download&id=${driveId}`}
                  className="movie-details-download-btn"
                >
                  {quality} - Download
                </a>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div className="related-movies-section">
         <h2 className="related-heading">Related Movies</h2>
        <div className="related-movie-card-container">
         
          {relatedMovies.map((movie, index) => (
            <Moviecard key={index} {...movie} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MovieDetailes;
