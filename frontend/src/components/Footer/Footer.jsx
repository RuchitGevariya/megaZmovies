import { React, useState } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css"; // CSS file import
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const resetEmail = () => {
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("please enter vaild email");
    }
try{
    await axios.post(
      `${import.meta.env.VITE_API_URL}/subscribe/news-letter`,
      { email },
      { withCredentials: true }
    );
    toast.success("Thank you for Subscribe!");
    resetEmail();
    } catch(error){
      if(error.response?.status===409){
   toast.error("Email allready subscribed");
      }
    console.error("Error details:", error);

    }
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2 className="footer-brand">
            Mega Z<span className="text-accent"> Movies</span>
          </h2>
          <p className="footer-tagline">Watch. Download. Enjoy.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bollywood">Bollywood</Link>
            </li>
            <li>
              <Link to="/hollywood">Hollywood</Link>
            </li>
            <li>
              <Link to="/gujrati">Gujrati</Link>
            </li>
            <li>
              <Link to="/animation">Animation</Link>
            </li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            aria-label="Email address"
            id="email"
          />
          <button onClick={handleSubmit}>Subscribe</button>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <Link to="">
              <FaFacebook />
            </Link>
            <Link to="">
              {" "}
              <FaTwitter />
            </Link>
            <Link to="">
              <FaInstagram />
            </Link>
            <Link to="">
              {" "}
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Mega Z Movies. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
