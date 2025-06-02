import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";


const PictureGallery = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/latestPicture?limit=8`,{
        withCredentials: true
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.success);
          
          setPictures(response.data.data);
        } else {
          setError("No pictures found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pictures:", error);
        setError("Failed to load pictures.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Recently Added</h2>
      <div className="row">
        {pictures.length === 0 ? (
          <p className="text-center">No pictures available.</p>
        ) : (
          pictures.map((picture) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={picture._id}>
              <div className="card">
                <img
                  src={picture.image}
                  alt={picture.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{picture.title}</h5>
                  <p className="card-text">{picture.description}</p>
                  <p className="card-text">
                    <strong>Genre:</strong> {picture.genres}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {picture.category}
                  </p>
                  <p className="card-text">
                    <strong>Duration:</strong> {picture.duration}
                  </p>
                  <p className="card-text">
                    <strong>Drive ID:</strong> {picture.driveId}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PictureGallery;
