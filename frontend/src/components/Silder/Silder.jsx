import {React,useState,useEffect}from 'react'
import "./Silder.css"
import assets from "../../assets/frontend_assets/assets"
import axios from "axios"
const Silder = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/banner/allbanner`);
        setBanners(res.data.banner); 
      } catch (err) {
        console.error('Failed to load banners', err);
      }
    };
    fetchBanners();
  }, []);
  return (
    <div>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/banners/${banner.image}`}
              className="d-block w-100"
              alt={banner.title || 'Banner'}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  )
}

export default Silder
