import React, { useState } from "react";
import { UserAuth } from "../../store/auth";
import styles from "./contact-page.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_SERVER_URL;

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const ContactPage = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  const { user, isLogIn } = UserAuth();
  const navigate = useNavigate();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((prve) => ({ ...prve, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogIn) {
        const response = await fetch(`${apiUrl}/api/from/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });

        if (response.ok) {
          setContact(defaultContactFormData);
        }
      } else {
        navigate("/login");
        toast.error("user is not login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.contactPage}>
      <h2 className={styles.title}>Contact Us</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={contact.username}
            onChange={handleInput}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={contact.message}
            onChange={handleInput}
            required
            rows="4"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
