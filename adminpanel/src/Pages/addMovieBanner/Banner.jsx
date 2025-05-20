import {React,useState} from 'react'
import "./banner.css"
import axios from 'axios'
const Banner = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const uploadBanner = async () => {
    if (!title || !image) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    setLoading(true);
    try {
      await axios.post("http://localhost:3001/api/admin/upload", formData,{
        withCredentials: true
      });
      alert("Uploaded successfully");
      setTitle('');
      setImage(null);
      setPreview('');
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="upload-banner-container">
      <h3>Upload Banner</h3>

      <input
        type="text"
        placeholder="Banner Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="upload-banner-input"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="upload-banner-file"
      />

      {preview && <img src={preview} alt="Preview" className="upload-banner-preview" />}

      <button
        onClick={uploadBanner}
        disabled={loading}
        className="upload-banner-button"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>  )
}

export default Banner;
