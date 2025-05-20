import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import MovieDetailes from "./components/Moviedetailes/MovieDetailes";
import Gujrati from "./Pages/GujratiMovie/Gujrati";
import South from "./Pages/South/South";
import Hollywood from "./Pages/Hollywood/Hollywood";
import Animation from "./Pages/Animation/Animation";
import Bollywood from "./Pages/Bollywood/Bollywood";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gujrati" element={<Gujrati />} />
        <Route path="/south" element={<South />} />
        <Route path="/hollywood" element={<Hollywood />} />
        <Route path="/bollywood" element={<Bollywood />} />
        <Route path="/animation" element={<Animation/>} />
        <Route path="/movies/:title" element={<MovieDetailes/>} />
      </Routes>
    </Router>
  );
};

export default App;


