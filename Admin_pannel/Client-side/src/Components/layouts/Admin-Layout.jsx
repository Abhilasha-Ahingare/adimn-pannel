import { useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserAuth } from "../../store/auth";
import "./AdminLayout.css";
import { FiMenu, FiX } from "react-icons/fi";

const AdminLayout = () => {
  const { user, isLoading } = UserAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <h1>loading....</h1>;
  if (!user.isAdmin) return <Navigate to="/" />;

  const showWelcome = location.pathname === "/admin";
  const handlehome = () => {
    navigate("/admin");
  };

  return (
    <>
      <section className="admin-container">
        <div className="admin-navbar">
          <h2 onClick={handlehome}>Admin Panel</h2>

          {/* Hamburger icon for small screen */}
          <button
            className="admin-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Nav Links */}
          <nav className={menuOpen ? "active" : ""}>
            <NavLink to="/admin/users" onClick={() => setMenuOpen(false)}>
              Users
            </NavLink>
            <NavLink to="/admin/services" onClick={() => setMenuOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/admin/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </nav>
        </div>

        {showWelcome && (
          <div className="admin-welcome">
            <h1>Welcome to {user?.username}</h1>
            <p>
              Your go-to destination for elegant, handcrafted jewelry that tells
              a story of timeless beauty.
            </p>
          </div>
        )}
      </section>

      <Outlet />
    </>
  );
};

export default AdminLayout;
