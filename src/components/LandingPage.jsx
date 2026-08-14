import React, { useState, useEffect } from "react";
import "./DynamicBackground.css";

const videos = [];

function LandingPage() {
  const [index, setIndex] = useState(0);

  // Auto-change video every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <video
        key={index} // reloads when source changes
        autoPlay
        muted
        playsInline
        className="bg-video"
      >
        <source src={videos[index]} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Coffee is a reason to wake up.</h1>
      </div>
    </div>
  );
}

export default LandingPage;
