import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomNavbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Moviecard from "../../components/Moviescard/Moviecard";
import "./Gujrati.css"
const Gujrati = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Api/public/listAllPicture`)
      .then((res) => {
        const filtered = res.data.data
          .filter((movie) => movie.category.toLowerCase() === "gujrati")
        setMovies(filtered); 
      })
      .catch((err) => console.log(err)); 
  }, []);

  return (
    <div>
     
   
        <div className="movie-card-container">
          {movies.map((movie, index) => (
            <Moviecard key={index} {...movie} />
          ))}
        </div>
    </div>
  );
};

export default Gujrati;
