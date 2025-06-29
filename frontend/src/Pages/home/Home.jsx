import React from "react";
import CustomNavbar from "../../components/Navbar/Navbar";
import Silder from "../../components/Silder/Silder";
import CardDisplay from "../../components/CardDisplay/CardDisplay";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div>
      <CustomNavbar />
      <Silder />
      <CardDisplay />
      <Footer />
    </div>
  );
};

export default Home;
