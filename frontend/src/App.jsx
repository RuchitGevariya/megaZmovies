import React from "react";
import { Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from "./Pages/home/Home";
import CustomNavbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MovieDetailes from "./components/Moviedetailes/MovieDetailes";
import Gujrati from "./Pages/GujratiMovie/Gujrati";
import South from "./Pages/South/South";
import Hollywood from "./Pages/Hollywood/Hollywood";
import Animation from "./Pages/Animation/Animation";
import Bollywood from "./Pages/Bollywood/Bollywood";
import MovieCategoryPage from "./Pages/MoviesCategory/MovieCategoryPage";
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
        <Route path="/:category" element={<MovieCategoryPage/>} />
        <Route path="/movies/:title" element={<MovieDetailes/>} />
      </Routes>
      <Footer/>
    {/* <Footer/> */}
    </>
  );
};

export default App;


