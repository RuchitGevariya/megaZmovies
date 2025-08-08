import React, { useEffect, useState } from "react";
import { useSearch } from "../../Context/SearchContext";
import Moviecard from "../Moviescard/Moviecard";
import axios from "axios";
import "./CardDisplay.css";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { Pagination } from "antd";
const CardDisplay = () => {
  const { searchQuery } = useSearch();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/public/listAllPicture`
        );
        const allMovies = res.data.data;

        const filteredMovies = allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMovies(filteredMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);
  useEffect(() => {
    console.log("that is search result:", movies);
  }, [movies]);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };


  return (
    <>
      {/* <h1 className="cards-title">
        Top <span style={{ color: "#FFC107" }}>IMDB</span> Rated Movies
      </h1> */}

      <div className="movies-container">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : currentMovies.length === 0 ? (
          <div className="no-results">
            <h3>No movies found for your search.</h3>
          </div>
        ) : (
          currentMovies.map((movie, index) => (
            <Moviecard key={index} {...movie} />
          ))
        )}
      </div>

      <div className="pagination-wrapper">
        <Pagination
          current={currentPage}
          pageSize={moviesPerPage}
          total={movies.length}
          onChange={handlePageChange}
          showSizeChanger={false} // hide "page size" dropdown
          showQuickJumper
        />
      </div>
     
    </>
  );
};

export default CardDisplay;
