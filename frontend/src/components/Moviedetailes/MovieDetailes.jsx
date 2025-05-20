import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MovieDetailes.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Moviecard from "../Moviescard/Moviecard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
const MovieDetailes = () => {
  const location = useLocation();
  const {
    title,
    year,
    image,
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
      .get("http://localhost:3001/api/public/listAllPicture")
      .then((res) => {
        const related = res.data.data.filter(
          (movie) =>
            movie.category.toLowerCase() === category.toLowerCase() &&
            movie.title !== title
        );

        // Shuffle the related movies randomly
        const shuffled = related.sort(() => 0.5 - Math.random());

        // Pick only the first 4 shuffled movies
        const selected = shuffled.slice(0, 4).map((movie) => ({
          ...movie,
          image: `http://localhost:3001/uploads/${movie.image}`,
        }));

        setRelatedMovies(selected);
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
        <div className="movie-details-content">
          {/* Movie Title */}
          <h1 className="movie-details-heading">
            {title} WEB-HDRip [Hindi ORG DD 2.0] 1080p | 720p | HEVC | 480p
            [x264|x265] Mega Z Movies
          </h1>

          {/* Movie Poster */}
       
          <img src={image} alt={title} className="movie-details-poster-img"  />
          {/* Release Info Section */}
          <div className="release-info">
            <h2>-: Release Info :-</h2>
            <p>
              <strong className="red">Title:</strong> {title}
            </p>
            <p>
              <strong className="red">Year:</strong> {year}
            </p>
            <p>
              <strong className="red">Genres:</strong>
              {Array.isArray(genres) ? genres.join(", ") : genres}
            </p>
            <p>
              <strong className="red">Category:</strong>
              {category}
            </p>
            <p>
              <strong className="red">Duration:</strong> {duration}
            </p>
            <p>
              <strong className="red">Description:</strong> {description}
            </p>
          </div>

          {/* Download Links */}
          <div className="download-section">
            <h2>-: Download Links :-</h2>
            <hr />

            <div className="download-buttons">
              {qualityOptions.map((quality, index) => (
                <div key={index} className="download-option">
                  <a
                    href={`https://drive.google.com/uc?export=download&id=${driveId}`}
                    className="movie-details-download-btn"
                  >
                    {quality} - Download
                  </a>
                  <p className="go-download-text">Go & Download</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
       
        </div>
      </div>
      <div className="related-movies-section">
        <div className="movie-card-container">
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
