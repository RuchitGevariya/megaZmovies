import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add"; // Import your Add component
import PictureGallery from "./Pages/list/List";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Banner from "./Pages/addMovieBanner/Banner"
import AdminLogin from "./Pages/login/Login";
// Create a Home component for the main page

function App() {
  return (
    <>
      <Navbar />
      <hr />
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<PictureGallery />} />
             <Route path="/banner" element={<Banner />} />
             <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default App;


