import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../../Config";
function Add() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState("");
  const [category, setcategory] = useState("");
  const [duration, setDuration] = useState("");
  const [driveId, setDriveId] = useState("");
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // prevent double submission

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("genres", genres);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("driveId", driveId);

    try {
      const response = await axios.post(
        `${config.API_URL}/api/admin/addPicture`,
        formData ,{
          withCredentials: true
        }
      );

      setMessage({ type: "success", text: "Movie added successfully!" });

      setTitle("");
      setYear(null);
      setImage(null);
      setPreview(null);
      setDescription("");
      setGenres("");
      setcategory("")
      setDuration("");
      setDriveId("");
      document.getElementById("image").value = "";

      setTimeout(() => {
        setMessage(null);
        setIsSubmitting(false);
        // navigate("/list");
      }, 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "There was an error adding the movie!",
      });

      setTimeout(() => {
        setMessage(null);
        setIsSubmitting(false);
      }, 5000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Movie</h2>

      {message && (
        <div
          className={`alert alert-${
            message.type === "success" ? "success" : "danger"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className=""
      >
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year:</label>
              <input
                type="text"
                id="year"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genres" className="form-label">Genres:</label>
              <input
                type="text"
                id="genres"
                className="form-control"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category:</label>
              <input
                type="text"
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duration:</label>
              <input
                type="text"
                id="duration"
                className="form-control"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="driveId" className="form-label">Drive ID:</label>
              <input
                type="text"
                id="driveId"
                className="form-control"
                value={driveId}
                onChange={(e) => setDriveId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image:</label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            {preview && (
              <div className="text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        </div>

<div className="text-center">
<button
          type="submit"
          className="btn btn-warning w-40 mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Movie"}
        </button>
</div>
        

      </form>
    </div>
  );
}

export default Add;
