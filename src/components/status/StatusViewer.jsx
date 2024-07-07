import React, { useEffect, useState } from "react";
import { stories } from "./DummyStory";

const StatusViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };
  useEffect(() => {
    const intervalId = setIntervalId(() => {
      handleNextStory();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);

  return (
    <div>
      <div className="flex justify-center items-center h-[100vh] bg-slate-900">
        <div className="relative">
          <img
            src={stories?.[currentStoryIndex].image}
            alt=""
            className="max-h-[96vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default StatusViewer;
