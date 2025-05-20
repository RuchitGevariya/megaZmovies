import { React, useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import assets from "../../assets/admin/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/check", { withCredentials: true })
      .then((res) => {
        setIsAdminLoggedIn(res.data?.success || false);
      })
      .catch(() => {
        setIsAdminLoggedIn(false);
      });
  }, []);

  const handleLogout = async () => {
    await axios.get("http://localhost:3001/api/auth/logout", {
      withCredentials: true,
    });
    setIsAdminLoggedIn(false);
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        <div className="brand">
          Mega Z<span className="text-warning"> Movies</span>
        </div>

        {isAdminLoggedIn === null ? (
          <div className="loading-text">Checking auth...</div> // or spinner
        ) : isAdminLoggedIn ? (
          <div className="profile-section">
            <img className="profile" src={assets.profile_icon} alt="Profile" />
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
    </>
  );
};

export default Navbar;
