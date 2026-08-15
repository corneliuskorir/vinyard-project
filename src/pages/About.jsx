<<<<<<< HEAD
function About() {
  return <h1>This is the about section</h1>;
}

export default About;
=======
import React, { useState, useEffect } from "react";
import "../components/About.css";

const images = [
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  "https://images.pexels.com/photos/296195/pexels-photo-296195.jpeg",
  "https://images.pexels.com/photos/39511/vineyard-wine-grapes-napa-valley-39511.jpeg",
  "https://images.pexels.com/photos/39512/vineyard-wine-grapes-napa-valley-39512.jpeg",
];

function AboutPage() {
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
>>>>>>> 7ae126b (about.css)
