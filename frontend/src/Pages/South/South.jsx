import { React, useState} from "react";
import axios from "axios";
import "./South.css";
import { useEffect } from "react";
import CustomNavbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Moviecard from "../../components/Moviescard/Moviecard";
const South = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Api/public/listAllPicture`)
      .then((res) => {
        const filtered = res.data.data
          .filter((movie) => movie.category.toLowerCase() === "south")
        setMovies(filtered);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
    <CustomNavbar />
      <div className="movie-card-container">
       
        {movies.map((movie, index) => (
          <Moviecard key={index} {...movie} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default South;
