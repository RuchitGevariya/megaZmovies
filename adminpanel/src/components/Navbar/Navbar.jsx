import { React, use, useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import assets from "../../assets/admin/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
const Navbar = () => {
 const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth(); 

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setIsAdminLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <div className="navbar">
      <div className="brand">
        Mega Z<span className="text-warning"> Movies</span>
      </div>

      {isAdminLoggedIn === null ? (
        <div className="loading-text">Checking auth...</div>
      ) : isAdminLoggedIn ? (
        <div className="profile-section">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="login-btn" onClick={handleLogin}>
          Admin Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
