import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./registration.css";
const apiUrl = import.meta.env.VITE_SERVER_URL;

const Registration = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { StoreToken } = UserAuth();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        StoreToken(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            value={user.username}
            placeholder="Username"
            onChange={inputHandler}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email Address"
            onChange={inputHandler}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={user.phone}
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            onChange={inputHandler}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={inputHandler}
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>

        <p className="register-link">
          Already have an account?
          <Link to="/login" className="link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
