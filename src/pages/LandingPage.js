import React, { useRef } from "react";
import "../Assets/CSS/LandingPage.css";
//for amination
import AOS from "aos";
import "aos/dist/aos.css";
//for email receiving:
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Compnents/Footer";

function LandingPage() {
  const navigate = useNavigate();
  const handleBrowseClick = () => {
    navigate("/books"); // Change to your actual route
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_08rjj6f",
        "template_muyd2ga",
        form.current,
        "KEcX1bLF-I1ZmyejE"
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          e.target.reset(); // clear form
        },
        (error) => {
          alert("❌ Something went wrong, try again later.");
          console.error("EmailJS Error:", error); // log the actual error
        }
      );
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <section id="hero" className="hero-section">
        <h1 className="hero-title">Bookcast 📚</h1>
        <p className="hero-tagline">
          Discover your next favorite book. Search, explore, and dive into a
          world of stories!
        </p>
        <button className="hero-button" onClick={handleBrowseClick}>
          Browse Books
        </button>
      </section>

      <section id="feature" className="features-section">
        <h2 className="features-title">✨ Features</h2>
        <div className="features-container">
          <div className="feature-card" data-aos="fade-right">
            <span className="feature-icon">🔍</span>
            <h3 className="feature-title">Search Books</h3>
            <p className="feature-text">
              Easily find books by title, author, or genre.
            </p>
          </div>
          <div className="feature-card" data-aos="fade-up">
            <span className="feature-icon">📚</span>
            <h3 className="feature-title">Explore Library</h3>
            <p className="feature-text">
              Browse collections and discover new favorites.
            </p>
          </div>
          <div className="feature-card" data-aos="fade-left">
            <span className="feature-icon">💛</span>
            <h3 className="feature-title">Save Favorites</h3>
            <p className="feature-text">
              Bookmark books you love and access them anytime.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="contact-title">Contact Us</h2>
        <p>Have questions or feedback? We'd love to hear from you!</p>

        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />

          <textarea name="title" placeholder="Your Message" rows="5" required />

          <button type="submit"> Send Message </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;
