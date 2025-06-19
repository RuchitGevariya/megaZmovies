import { React} from "react";
import "./Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import config from "../../Config";
const Navbar = () => {
 const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth(); 

  const navigate = useNavigate();

const handleLogout = async () => {
  console.log("Logging out...");

  try {
    const res = await axios.get(`${config.API_URL}/api/auth/logout`, {
      withCredentials: true,
    });

    console.log("Logout response:", res.data);

    if (res.data?.success) {
      setIsAdminLoggedIn(false);
      navigate("/login");
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};


  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <div className="navbar">
     <div className="navbar-logo">
  <h2 className="brand">
    Mega Z<span className="text-accent"> Movies</span>
  </h2>
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
