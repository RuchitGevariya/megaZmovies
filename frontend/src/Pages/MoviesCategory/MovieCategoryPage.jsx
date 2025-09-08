import React, { useEffect, useState } from 'react'
import "./MovieCategoryPage.css"
import { Pagination } from "antd";
import { useParams } from 'react-router-dom';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import axios from 'axios';
import Moviecard from '../../components/Moviescard/Moviecard';
const MovieCategoryPage = () => {
  const {category}=useParams()
 const moviesPerPage=12
  const [movie,setMovies]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [total,setTotal]=useState(0)
    const [loading, setLoading] = useState(true);
  useEffect(()=>{
        const fetchMoviesCategoryWise = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/public/listAllPicture?page=${currentPage}&limit=${moviesPerPage}&category=${category}`
        );
        setMovies(res.data.data);
        setTotal(res.data.total)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMoviesCategoryWise();

  },[category])
  const handlePageChange=(page)=>{
   setCurrentPage(page)
  }
  return (
    <div>

 <div className="movies-container">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))   
        ) : (
          movie.map((movie, index) => (
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
              />
            </div>
    </div>
  )
}

export default MovieCategoryPage
