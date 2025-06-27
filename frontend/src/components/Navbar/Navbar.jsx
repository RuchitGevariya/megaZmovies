import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { FaSearch, FaBars, FaTimes, FaTv, FaLink } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useSearch } from "../../Context/SearchContext";

import "./Navbar.css";
export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchQuery } = useSearch();
  const [searchInput, setSearchInput] = useState("");

  return (
    <Navbar expand="md" className="px-3 navbar">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <span style={{ color: "#2c3e50", fontWeight: "bold" }}>Mega Z</span>
          <span style={{ color: "#f39c12" }}> Movies</span>
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav" className={isOpen ? "show" : ""}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-text">
              Home
            </Nav.Link>
            {["Bollywood", "Hollywood", "Gujrati", "South", "Animation"].map(
              (label) => (
                <Nav.Link
                  as={Link}
                  to={`/${label.toLowerCase()}`}
                  className="nav-text"
                  key={label}
                >
                  {label}
                </Nav.Link>
              )
            )}
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchQuery(e.target.value);
              }}
            />
            {searchInput && (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setSearchInput("");
                  setSearchQuery("");
                }}
              >
                Clear
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
