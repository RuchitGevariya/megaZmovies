import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../../Config";
import toast from "react-hot-toast";
function Add() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(null);
  const [image, setImage] = useState(null);
  const [bannerImage,setBannerImage]=useState(null)
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState("");
  const [category, setcategory] = useState("");
  const [duration, setDuration] = useState("");
  const [driveId, setDriveId] = useState("");
  const [trailerId, setTrailerId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
const handleBannerImage =(e) =>{
      const file = e.target.files[0];
    setBannerImage(file);
}

const restFormData=()=>{
     setTitle("");
      setYear(null);
      setImage(null);
      setBannerImage(null)
      setPreview(null);
      setDescription("");
      setGenres("");
      setcategory("")
      setDuration("");
      setDriveId("");
      setTrailerId("")
      document.getElementById("image").value = "";
document.getElementById("bannerImage").value = "";
}
  const handleSubmit = async (e) => {
    e.preventDefault();
 setIsSubmitting(true);
    if(!title||!year||!genres||!image||!bannerImage||!description||!category||!duration||!driveId) return toast.error("All filed are required")
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("image", image);
    formData.append("banner",bannerImage)
    formData.append("description", description);
    formData.append("genres", genres);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("driveId", driveId);
     formData.append("trailerId", trailerId);
    try {
      const response = await axios.post(
        `${config.API_URL}/api/admin/addPicture`,
        formData ,{
          withCredentials: true
        }
      );

     toast.success("Movie Added successfully")
    restFormData()
    } catch (error) {
     toast.error("Internal Sever Error")
    }finally{
      setIsSubmitting(false)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Movie</h2>
      <form
        onSubmit={handleSubmit}
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
              <label htmlFor="driveId" className="form-label">Youtub TrailerId:</label>
              <input
                type="text"
                id="TriId"
                className="form-control"
                value={trailerId}
                onChange={(e) => setTrailerId(e.target.value)}
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
             <div className="mb-3">
              <label htmlFor="bannerImage" className="form-label">BannerImage:</label>
              <input
                type="file"
                id="bannerImage"
                className="form-control"
                onChange={handleBannerImage}
                required
              />
            </div>
            {bannerImage && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(bannerImage)}
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
