import React, { useState, useEffect } from "react";
import "../components/About.css";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1596142332133-327e2a0ff006?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlueWFyZHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlueWFyZHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1726741827090-0b5a52b45686?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHZpbnlhcmR8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1663045589439-856e650d7637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHZpbnlhcmR8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1643087448435-72f70bd4ce88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHZpbnlhcmR8ZW58MHx8MHx8fDA%3D",
];

function AboutPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 1000); // fade duration
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      <div className="about-text">
        <h2>About Our Vineyard</h2>
        <p>
          Nestled in rolling hills, our vineyard is dedicated to crafting wines
          that embody the harmony of nature and tradition. Each grape is
          nurtured under the sun, harvested with care, and transformed into
          bottles that tell the story of our land.
        </p>
        <p>
          With sustainable practices and a passion for excellence, we invite you
          to experience the timeless beauty of our vineyard and the wines born
          from it.
        </p>
        <div className="about-buttons">
          <button onClick={() => navigate("/shop")}>Visit Shop</button>
          <button onClick={() => navigate("/events")}>View Events</button>
          <button onClick={() => navigate("/book-visit")}>Book a Visit</button>
        </div>
      </div>
      <div className="about-image">
        <img
          src={images[index]}
          alt="Vineyard view"
          className={`vineyard-img ${fade ? "fade-out" : "fade-in"}`}
        />
      </div>
    </div>
  );
}

export default AboutPage;
