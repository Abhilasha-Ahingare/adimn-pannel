import React from "react";
import { UserAuth } from "../../store/auth";
import ProductPage from "./products";
import FeatucreSection from "./featucreSection";
import "./home.css";

const HomePage = () => {
  const { user, isLogIn } = UserAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hello, {isLogIn ? user?.username : "Guest"} 👋</h1>
            <h2>Discover Premium Products and Services</h2>
            <p>
              We are your one-stop platform for exploring top-rated products and
              seamless services, delivering satisfaction at every step.
            </p>
            <button className="explore-btn">Explore Now</button>
          </div>
          <div className="hero-image">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
              alt="Welcome"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductPage />

      {/* Features */}
      <FeatucreSection />

      {/* About Section */}
      <section className="about-section-home">
        <div className="about-container-home">
          <div className="about-image-home">
            <img
              src="https://cdn.pixabay.com/photo/2024/06/22/18/09/ai-generated-8846757_1280.jpg"
              alt="About us"
            />
          </div>
          <div className="about-text-home">
            <h2>About Us</h2>
            <p>
              We are a passionate team committed to delivering top-notch
              solutions and delightful experiences. Our mission is to provide
              innovative, reliable, and affordable services that empower our
              customers to succeed.
            </p>
            <p>
              With years of experience, we ensure quality, efficiency, and
              satisfaction in every service we offer. Join us and experience the
              difference.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
