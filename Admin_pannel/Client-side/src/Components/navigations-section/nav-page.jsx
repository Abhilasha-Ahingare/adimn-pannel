import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../store/auth";
import { FaUser } from "react-icons/fa";
import "../navigations-section/nav-page.css";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, isLogIn } = UserAuth();
  const navigate = useNavigate();
  const handleAdmin = () => {
    if (!user.isAdmin) {
      toast.error("Access denied. You're not an admin!");
      return navigate("/");
    }
    navigate("/admin");
  };

  return (
    <>
      <header>
        <div className="logo-brand">
          <NavLink to="/">home</NavLink>
        </div>
        <nav>
          <ul>
            <li>
              {" "}
              <NavLink to="/">home</NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/services">products</NavLink>
            </li>

            {isLogIn ? (
              <>
                <li>
                  {" "}
                  <NavLink to="/logout">LogOut</NavLink>
                </li>
                <li>
                  <FaUser
                    onClick={handleAdmin}
                    style={{ cursor: "pointer", color: "white" }}
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <NavLink to="/login">login</NavLink>
                </li>
              </>
            )}

            <li>
              {" "}
              <NavLink to="/contact">contact us</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
