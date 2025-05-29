import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null);

  useEffect(() => {
  const checkAuth = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth/check`, { withCredentials: true })
      .then((res) => {
        setIsAdminLoggedIn(res.data?.success || false);
      })
      .catch(() => {
        setIsAdminLoggedIn(false);
      });
  };

  checkAuth(); // Initial check
  const interval = setInterval(checkAuth, 5 * 60 * 1000); // Recheck every 5 minutes

  return () => clearInterval(interval); // Cleanup on unmount
}, []);


  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
