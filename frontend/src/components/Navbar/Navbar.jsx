import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { FaSearch, FaBars, FaTimes, FaTv, FaLink } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";  
import { useSearch } from "../../Context/SearchContext";

import "./Navbar.css"
export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchQuery } = useSearch();
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput); 
  };
  return (
    <Navbar expand="md" bg="dark" variant="dark"  className="px-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">Mega Z<span className="text-warning"> Movies</span></Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav" className={isOpen ? "show" : ""}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-text">Home</Nav.Link>
            <Nav.Link as={Link} to="/bollywood" className="nav-text" >Bollywood</Nav.Link>
            <Nav.Link as={Link} to="/hollywood" className="nav-text">Hollywood</Nav.Link>
            <Nav.Link as={Link} to="/gujrati" className="nav-text">Gujrati</Nav.Link>
            <Nav.Link as={Link} to="/south" className="nav-text">South</Nav.Link>
            <Nav.Link as={Link} to="/animation" className="nav-text">Animation</Nav.Link>
            <Nav.Link  className="d-flex align-items-center" disabled>
              <FaTv className="me-1"  /> TV Shows
            </Nav.Link>
            <Nav.Link href="#" className="d-flex align-items-center" disabled>
              <FaLink className="me-1" /> Genre
            </Nav.Link>
            <Nav.Link href="#"className="nav-text" disabled>By Year</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search..."
        className="me-2"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button variant="warning" type="submit">
        <FaSearch />
      </Button>
    </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}