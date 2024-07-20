import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ index, activeIndex, duration }) => {
  const isActive = index === activeIndex;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          }
          clearInterval(intervalId);
          return prev;
        });
      }, duration / 100);

      return () => clearInterval(intervalId);
    }
  }, [isActive, duration]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
