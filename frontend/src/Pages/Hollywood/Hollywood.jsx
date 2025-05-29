import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Moviecard from '../../components/Moviescard/Moviecard';
import './Hollywood.css'; 
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';

const Hollywood = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
  const moviesPerPage = 12;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Api/public/listAllPicture`)
      .then((res) => {
        const filtered = res.data.data
          .filter((movie) => movie.category.toLowerCase() === 'hollywood')
        setMovies(filtered);
        setLoading(false)

      })
      .catch((err) => console.log(err));
  }, []);

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div>
      <CustomNavbar />

      <div className="movie-card-container">
          {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonCard key={index} />
                          ))
                        : currentMovies.map((movie, index) => (
                            <Moviecard key={index} {...movie} />
                          ))}
      </div>

      <div className="pagination-wrapper">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Hollywood;
