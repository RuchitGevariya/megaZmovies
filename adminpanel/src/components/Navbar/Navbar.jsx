import { React} from "react";
import "./Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import config from "../../Config";
import toast from "react-hot-toast";
const Navbar = () => {
 const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth(); 

  const navigate = useNavigate();

const handleLogout = async () => {

  try {
    const res = await axios.get(`${config.API_URL}/api/auth/logout`, {
      withCredentials: true,
    });

    if (res.data?.success) {
      setIsAdminLoggedIn(false);
      navigate("/login");
      toast.success("Logout success")
    }
  } catch (error) {
    console.error("Logout error:", error);
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
