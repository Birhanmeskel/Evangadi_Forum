import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import "./Header.css";
import evangadiLogo from "../../assets/evangadiLogo.png"
function Header({ logout }) {
  const [sticky, setSticky] = useState(false);
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickChange = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header
      className={`navbar navbar-expand-lg navbar-light bg-light header ${
        sticky ? "sticky" : ""
      }`}
    >
      <div className="addpad">
        <Navbar
          expand="md"
          className={`nav kk bg-body-tertiary fixed-top shadow-sm ${
            sticky ? "sticky" : ""
          }`}
        >
          <Container className="cont">
            {/* LOGO - Navigate to Home Page */}
            <Navbar.Brand as={Link} to="/">
              <img src={evangadiLogo} alt="evangadiLogo" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="offcanvasNavbar" />

            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Home Link */}
                  <Nav.Link as={Link} to="/" className="nav-txt links">
                    Home
                  </Nav.Link>
                  {/* How It Works Link */}
                  <Nav.Link
                    as={Link}
                    to="/how-it-works"
                    className="nav-txt links"
                  >
                    How it Works
                  </Nav.Link>
                  {/* //window.location.href = "/how-it-works"; */}
                  {/* Sign In / Log Out Button */}
                  <Nav.Link>
                    <div className="connect-block btn-blue">
                      <button
                        className="nav-btn header-btn btn btn-blue btn-success"
                        onClick={() => navigate("/login")}
                      >
                        {token ? "Log Out" : "Sign In"}
                      </button>
                    </div>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;

// const navigate = useNavigate();

// <Navbar.Brand onClick={() => navigate("/")}>
//   <img src={Homelogo} alt="evangadiLogo" />
// </Navbar.Brand>;
