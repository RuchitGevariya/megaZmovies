import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import "./HeroSection.css"
Modal.setAppElement("#root");
const HeroSection = () => {
   const location = useLocation();
    const {
      title,
      year,
      image,
      bannerImage,
      duration,
      thrillerId
    } = location.state || {};
    
  
  const [showTrailer, setShowTrailer] = useState(false);
    const handleCloseTrailer = () => {
    setTimeout(() => setShowTrailer(false), 200);
  };
  return (
    <>
            <div className="movie-details-hero">
          <img
            src={bannerImage || image}
            alt={title}
            className="movie-details-hero-img"
          />
          <div className="movie-details-hero-overlay">
            <h1>{title}</h1>
            <p>
              {year} • {duration}
            </p>
            <button
              className="hero-play-button"
              onClick={() => setShowTrailer(true)}
            >
              ▶ Play Trailer
            </button>
          </div>
        </div>
        <Modal
          isOpen={showTrailer}
          onRequestClose={handleCloseTrailer}
          contentLabel="Trailer"
          style={{
            overlay: { 
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex:1000
             },
            content: {
              inset: "10%",
              background: "transparent",
              border: "none",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow:"hidden"
            },
          }}
        >
          <div className="iframe-container">
   <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={thrillerId ?`https://www.youtube.com/embed/${thrillerId}?autoplay=0&mute=0`:'https://www.youtube.com/embed/r3P9oUn_z-c?autoplay=0&mute=0'}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          </div>
  
          <button
            onClick={handleCloseTrailer}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </Modal>

    </>
  )
}

export default HeroSection
