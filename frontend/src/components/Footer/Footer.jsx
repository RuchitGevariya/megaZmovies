import {React,useState} from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css"; // CSS file import

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email.");
      setMessageType("error")
    } else {
      setMessage("Thank you for subscribing!");
      setMessageType("success")
      setEmail("");
    }
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Mega Z<span className="text-warning"> Movies</span></h2>
          <p>Watch. Download. Enjoy.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bollywood">Bollywood</Link></li>
            <li><Link to="/hollywood">Hollywood</Link></li>
            <li><Link to="/gujrati">Gujrati</Link></li>
            <li><Link to="/animation">Animation</Link></li>
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
          {message && (
            <p
              style={{
                color: messageType === "success" ? "lightgreen" : "red",
                marginTop: "8px",
              }}
            >
              {message}
            </p>
          )}
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
           <Link to=""><FaFacebook /></Link> 
           <Link to="">  <FaTwitter /></Link> 
           <Link to=""><FaInstagram /></Link> 
           <Link to=""> <FaYoutube /></Link> 
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
