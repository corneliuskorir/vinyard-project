import React, { useState, useEffect } from "react";
import "../components/LandingPage.css";

const videos = [
  "https://www.pexels.com/download/video/32920452/",
  "https://www.pexels.com/download/video/9947680/",
  "https://www.pexels.com/download/video/6356427/",
  "https://www.pexels.com/download/video/7889505/",
  "https://www.pexels.com/download/video/7687088/",
  "https://www.pexels.com/download/video/5944609/",
  "https://www.pexels.com/download/video/15909395/",
];

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // fade out current video
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % videos.length); // switch source
        setFade(false); // fade back in
      }, 500); // fade duration
    }, 10000); // change every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <video
        key={index}
        autoPlay
        muted
        playsInline
        className={`bg-video ${fade ? "fade-out" : "fade-in"}`}
      >
        <source src={videos[index]} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Wine is sunlight, held together by water.</h1>
      </div>
    </div>
  );
}

export default LandingPage;
