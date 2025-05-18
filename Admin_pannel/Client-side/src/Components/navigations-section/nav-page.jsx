import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../store/auth";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import "../navigations-section/nav-page.css";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, isLogIn } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAdmin = () => {
    if (!user?.isAdmin) {
      toast.error("Access denied. You're not an admin!");
      return navigate("/");
    }
    navigate("/admin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-brand">
          <NavLink to="/">home</NavLink>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={menuOpen ? "active" : ""}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>home</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>about</NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={() => setMenuOpen(false)}>products</NavLink>
            </li>
            {isLogIn ? (
              <>
                <li>
                  <NavLink to="/logout" onClick={() => setMenuOpen(false)}>LogOut</NavLink>
                </li>
                <li>
                  <FaUser
                    onClick={() => {
                      handleAdmin();
                      setMenuOpen(false);
                    }}
                    style={{ cursor: "pointer", color: "white", padding: "0 1rem" }}
                  />
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)}>contact us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
