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
  const [total,settotal]=useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/public/listAllPicture?page=${currentPage}&limit=${moviesPerPage}&search=${searchQuery}`
        );
        setMovies(res.data.data);
        settotal(res.data.total)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [currentPage,searchQuery]);
 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  return (
    <>
    {!loading && movies.length ===0 && (
       <div className="no-results">
            <h3>No movies found for your search.</h3>
          </div>
    )}
      <div className="movies-container">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))   
        ) : (
          movies.map((movie, index) => (
            <Moviecard key={index} {...movie} />
          ))
        )}
      </div>

      <div className="pagination-wrapper">
        <Pagination
          current={currentPage}
          pageSize={moviesPerPage}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false} // hide "page size" dropdown
          showQuickJumper
        />
      </div>
     
    </>
  );
};

export default CardDisplay;
