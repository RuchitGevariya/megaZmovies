import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from "./Pages/home/Home";
import CustomNavbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MovieDetailes from "./components/Moviedetailes/MovieDetailes";
// import MovieCategoryPage from "./Pages/MoviesCategory/MovieCategoryPage";
const MovieCategoryPage=lazy(()=>import("./Pages/MoviesCategory/MovieCategoryPage"))
const App = () => {
  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
/> 
   <CustomNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={
          <Suspense fallback={<p>Loading...</p>}>
            <MovieCategoryPage/>
          </Suspense>
          } />
        <Route path="/movies/:title" element={<MovieDetailes/>} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;


